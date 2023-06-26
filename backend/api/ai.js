import express from "express";
import axios from "axios";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { HTTP } from "../util/StatusCodes.js";
import { choices } from "../__tests__/data/dummy-data.js";

const model = "gpt-3.5-turbo";
const useDummyChatResponse = true;

// Load .env for use
config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post("/chat/message", async (req, res) => {
  if (!configuration.apiKey) {
    res.status(HTTP.INTERNAL_SERVER_ERROR_500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const input = req.body.message || "";
  if (input.trim().length === 0) {
    res.status(HTTP.BAD_REQUEST_400).json({
      error: {
        message: "Please enter a valid input",
      },
    });
    return;
  }

  try {
    let completion;
    if (useDummyChatResponse) {
      completion = {
        data: {
          choices,
        },
      };
    } else {
      completion = await openai.createChatCompletion({
        model,
        messages: generateMessages(input),
        // temperature: 0.6
      });
    }

    console.log(completion);
    console.log(completion.data.choices);
    res.status(HTTP.OK_200).json({ result: completion.data });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(HTTP.INTERNAL_SERVER_ERROR_500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
});

function generateMessages(input) {
  const message = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: input },
  ];

  return message;
}

export default router;
