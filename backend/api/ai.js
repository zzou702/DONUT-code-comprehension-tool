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
    checkAPIKeyExists();

    const program = req.body.program;

    if (!program) {
      throw new Error("Please enter a valid input.");
    }

    const completion = await openai.createChatCompletion({
      model: LLM_MODEL,
      messages: [
        {
          role: "system",
          content:
            "From the following program, generate 2 easy, 2 medium and 1 hard difficulty questions to test a student's code comprehension ability." +
            "Output as JSON where each difficulty is a key to an array of questions.",
        },
        { role: "user", content: program },
      ],
      // temperature: 0.6
    });

    outputCompletion(completion, res);
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
