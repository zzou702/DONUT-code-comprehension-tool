import express from "express";
import axios from "axios";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { HTTP } from "../util/StatusCodes.js";
import { choices } from "../__tests__/data/dummy-data.js";

const LLM_MODEL = "gpt-3.5-turbo";
const useDummyChatResponse = false;

// Load .env for use
config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post("/chat/message", async (req, res) => {
  try {
    checkAPIKeyExists();

    const input = req.body.message || "";
    if (input.trim().length === 0) {
      res.status(HTTP.BAD_REQUEST_400).json({
        error: {
          message: "Please enter a valid input",
        },
      });
      return;
    }

    let completion;
    if (useDummyChatResponse) {
      completion = {
        data: {
          choices,
        },
      };
    } else {
      completion = await openai.createChatCompletion({
        model: LLM_MODEL,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: input },
        ],
        // temperature: 0.6
      });
    }

    outputCompletion(completion, res);
  } catch (error) {
    handleError(error, res);
  }
});

router.post("/questions", async (req, res) => {
  try {
    // Checking
    checkAPIKeyExists();

    const program = req.body.program;

    if (!program) {
      throw new Error("Please enter a valid input.");
    }

    // API usage
    const completion = await openai.createChatCompletion({
      model: LLM_MODEL,
      messages: [
        {
          role: "system",
          content:
            "From the following program, generate 2 easy, 2 medium and 1 hard difficulty questions to test a student's code comprehension ability." +
            "Output only the question; no answers." +
            "Example output: 'EASY:\n1. First\n2. Second\nMEDIUM:\n1. etc..'" +
            "If the code cannot generate questions, e.g: too short or invalid, output why as an error message.",
        },
        { role: "user", content: program },
      ],
      // temperature: 0.6
    });

    // Handle response
    const result = getMessageContent(completion)
      .split("\n")
      .filter((line) => {
        return line != "";
      });

    // Parse questions

    const questions = [];
    console.log(result);

    let currentDifficulty;

    result.forEach((line) => {
      // Parse difficulty headers to determine current difficulty.
      if (
        line.includes("EASY") ||
        line.includes("MEDIUM") ||
        line.includes("HARD")
      ) {
        currentDifficulty = line.replace(":", "");
        return;
      }

      // Not a difficulty header; parse as a question.

      line = line.replace(/[0-9]./g, "").trim();

      questions.push({
        description: line,
        difficulty: currentDifficulty,
      });
    });

    console.log(questions);
    res.status(HTTP.OK_200).json({ result: questions });
  } catch (error) {
    handleError(error, res);
  }
});

router.post("/explanation", async (req, res) => {
  try {
    // Checking
    checkAPIKeyExists();

    const program = req.body.program;
    const highlightedLines = req.body.highlightedLines;

    if (!program) {
      throw new Error("Please enter a valid input.");
    }

    // API usage
    const completion = await openai.createChatCompletion({
      model: LLM_MODEL,
      messages: [
        {
          role: "system",
          content:
            "Can you provide an detailed explanation for the following highlighted line from the program with regards to the following program itself? Output only the explanation.",
        },
        {
          role: "user",
          content:
            "Lines highlighted from the program: " +
            highlightedLines +
            "\nProgram: " +
            program,
        },
      ],
    });
    console.log(completion);

    // Handle response
    const result = getMessageContent(completion);

    console.log(result);
    res.status(HTTP.OK_200).json({ result: result });
  } catch (error) {
    handleError(error, res);
  }
});

// Helper functions

function outputCompletion(completion, res) {
  console.log(completion);
  console.log(completion.data.choices);
  res.status(HTTP.OK_200).json({ result: completion.data });
}

function getMessageContent(completion) {
  return completion.data.choices[0].message.content;
}

function handleError(error, res) {
  // Consider adjusting the error handling logic for your use case
  if (error.response) {
    console.error(error.response.status, error.response.data);
    res.status(error.response.status).json(error.response.data);
    return;
  }

  console.error(error);
  console.error(`Error with OpenAI API request: ${error.message}`);
  res.status(HTTP.INTERNAL_SERVER_ERROR_500).json({
    error: {
      message: "An error occurred during your request.",
    },
  });
}

function checkAPIKeyExists(res) {
  if (!configuration.apiKey) {
    throw new Error(
      "OpenAI API key not configured, please follow instructions in README.md"
    );
  }
}

export default router;
