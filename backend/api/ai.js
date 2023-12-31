import express from "express";
import axios from "axios";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { HTTP } from "../util/StatusCodes.js";
import { choices } from "../__tests__/data/dummy-data.js";
import { ServerApiVersion, MongoClient } from "mongodb";
import {
  insertQuizFromPrompt,
  insertQuizFromCustomCode,
  insertQAFeedback,
  incrementGenerateMoreClicked,
  getQuizById,
  getQuestionDetailsById,
  updateFeedbackConversation,
} from "../database/database.js";

const LLM_MODEL = "gpt-3.5-turbo";
const useDummyChatResponse = false;

// Load .env for use
config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// //MongoDB driver connection
// const mongoDB_uri = process.env.MONGODB_URI;

// const client = new MongoClient(mongoDB_uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

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

// Generate a program from a given prompt.
router.post("/program", async (req, res) => {
  try {
    // Checking
    checkAPIKeyExists();

    const prompt = req.body.prompt;
    const student_id = req.body.student_id;

    if (!prompt) {
      throw new Error("Please enter a valid input.");
    }

    // API usage
    const completion = await openai.createChatCompletion({
      model: LLM_MODEL,
      messages: [
        // {
        //   role: "system",
        //   content:
        //     "You are a bot that can only outputs code. You do not converse.",
        // },
        {
          role: "system",
          content:
            "Generate a program from the following prompt." +
            "If the prompt is invalid, generate a fitting program of your choice." +
            "Avoid using external libraries" +
            "Output only the code; no comments." +
            "Do not output anything else other than the code.",
        },
        { role: "user", content: "Prompt: " + prompt },
      ],
      //The following prompt outputs additional sentences: generate a program that performs the binary search
      // temperature: 0.6
    });

    const content = completion.data.choices[0].message.content;

    // Parse output into raw code (NOTE: assumes GPT outputs as markdown)

    const language = content.match(/```(\w+)\n/)?.[1];
    console.log(language);

    let lines = content.split("\n");
    lines = lines.filter((line) => !line.includes("```"));

    let program = lines.join("\n");

    console.log(program);

    //Database call
    let program_id = await insertQuizFromPrompt(prompt, program, student_id);

    //Outputing result
    outputResult(
      {
        program_id,
        program,
        language,
      },
      res
    );
  } catch (error) {
    handleError(error, res);
  }
});

// Generate questions from a given program.
router.post("/questions", async (req, res) => {
  try {
    // Checking
    checkAPIKeyExists();

    let program_id = req.body.program_id;
    const program = req.body.program;
    const student_id = req.body.student_id;

    if (!program) {
      throw new Error("Please enter a valid input.");
    }

    //Insert custom program into database if program_id is not provided i.e. program is custom
    if (!program_id) {
      //Database call
      program_id = await insertQuizFromCustomCode(program, student_id);
    }

    //increment the generate_more_clicked field by 1, database call
    await incrementGenerateMoreClicked(program_id);

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
    res.status(HTTP.OK_200).json({ result: questions, program_id: program_id });
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
            "Can you provide an detailed explanation for the following highlighted line from the program with regards to the following program itself?" +
            "Describe the functionality of the line as a component to the program." +
            "Answer it you would if you were a computer science teacher, and the student who is asking about the highlighted line is somewhat new to programming. " +
            "Also provide detailed explanation on concepts included in the line if you deem it to be difficult for novice programmers to understand. for example: recursion, pointers etc." +
            "Output only the explanation." +
            "Don't output titles or subtitles" +
            "Don't output the highlighted line! Don't output anything else other than the explanation.",
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

router.post("/submitAnswer", async (req, res) => {
  try {
    // Checking
    checkAPIKeyExists();

    const program_id = req.body.program_id;
    const student_id = req.body.student_id;
    const program = req.body.program;
    const question = req.body.question;
    const answer = req.body.answer;
    const difficulty = req.body.difficulty;

    // API usage
    const completion = await openai.createChatCompletion({
      model: LLM_MODEL,
      messages: [
        {
          role: "system",
          content:
            "Given the following program that is created to test the students code comprehension skills, " +
            "The following question was created in order to test the students ability to understand the program. " +
            "The student has provided the following answer to the question. " +
            "Can you assess how well the student has answered the question provided taking into account the context of the program " +
            "Provide feedback on the answer provided by the student, as well as any additional comments you may have on the student's answer. " +
            "Ignore the answer if it is gibberish or empty. in which case you can provide the correct answer to the question as well as feedback and comments." +
            "Provide the answer or feedback or comments as you would a computer science teacher, talking directly to the student who answered the question" +
            "Output only the answer / feedback / comments.",
        },
        {
          role: "user",
          content:
            "Program: " +
            program +
            "\nQuestion: " +
            question +
            "\nAnswer: " +
            answer,
        },
      ],
    });
    console.log(completion);

    // Handle response
    const feedback = getMessageContent(completion);

    //Database call
    //check if the answer is resubmitted
    const question_id = await insertQAFeedback(
      student_id,
      program_id,
      question,
      answer,
      difficulty,
      feedback
    );

    console.log(feedback);
    res
      .status(HTTP.OK_200)
      .json({ result: feedback, question_id: question_id });
  } catch (error) {
    handleError(error, res);
  }
});

router.post("/getFeedback", async (req, res) => {
  try {
    // Checking
    checkAPIKeyExists();

    const question_id = req.body.question_id;
    // const question_id = "64dc1ae3637909abcb218755";

    //database call
    const questionDetails = await getQuestionDetailsById(question_id);
    const feedback = questionDetails.feedback;

    // Split the feedback history into lines
    const lines = feedback.split("\n");

    // Initialize an array to store the mapped messages
    const mappedArray = [];
    let currentMessage = "";

    // Loop through the lines and map them into the array
    for (const line of lines) {
      if (line.startsWith("\n")) {
        continue;
      }

      if (line.startsWith("You (ChatGPT)")) {
        if (currentMessage) {
          mappedArray.push(currentMessage.trim());
          currentMessage = "";
        }
      }
      if (
        line.startsWith("The student have asked the following in a follow up: ")
      ) {
        mappedArray.push(currentMessage.trim());
        currentMessage = "";
      }
      currentMessage += "\n" + line;
    }

    // Push the last message if there's any remaining
    if (currentMessage) {
      mappedArray.push(currentMessage.trim());
    }

    const gptPrefix = "You (ChatGPT) have given the following feedback:";
    const studentPrefix =
      "The student have asked the following in a follow up: ";

    // Remove the prefix from the messages
    for (let i = 0; i < mappedArray.length; i++) {
      if (mappedArray[i].startsWith(gptPrefix)) {
        mappedArray[i] = mappedArray[i].replace(gptPrefix, "");
      } else if (mappedArray[i].startsWith(studentPrefix)) {
        mappedArray[i] = mappedArray[i].replace(studentPrefix, "");
      }
    }

    // Output the mapped array
    // console.log(mappedArray);

    for (let i = 0; i < mappedArray.length; i++) {
      console.log(i + ": " + mappedArray[i]);
    }

    // console.log(feedback);

    res.status(HTTP.OK_200).json({ result: mappedArray });
  } catch (error) {
    handleError(error, res);
  }
});

router.post("/feedbackChat", async (req, res) => {
  //get the question, answer and
  // {
  //   quesiton_id;
  //   context; //program, question, answer
  //   new_prompt;
  // }

  //Get the question, answer and previous feedback from the database
  //Get the new prompt from the frontend
  //Call the API with the new prompt and the previous feedback
  //Return the new feedback
  //store and append the new feedback into the database

  try {
    // Checking
    checkAPIKeyExists();

    const question_id = req.body.question_id;
    const new_prompt = req.body.new_prompt;
    // const question_id = "64d21eb97d9efda0f5c7b900";
    // const new_prompt =
    //   "can you provide further details on what a sub matrix is";

    console.log(question_id);
    console.log(new_prompt);

    //Get the question, answer and previous feedback from the database
    //database call
    const questionDetails = await getQuestionDetailsById(question_id);
    const quiz_id = questionDetails.quiz_id;
    const question = questionDetails.question;
    const answer = questionDetails.answer;
    const feedback = questionDetails.feedback;

    //Get the quiz from the database
    const quiz = await getQuizById(quiz_id);
    const program = quiz.program;

    // API usage, call the API with the new prompt and the previous feedback
    const completion = await openai.createChatCompletion({
      model: LLM_MODEL,
      messages: [
        {
          role: "system",
          content:
            "Given the following program that is created to test the students code comprehension skills: " +
            program +
            "\nThe following question was created in order to test the students ability to understand the program: " +
            question +
            "\nThe student has provided the following answer to the question: " +
            answer +
            "\nYou (ChatGPT) have had the following conversation with the student that may include feedbacks you have given, follow ups students have asked etc. " +
            "You and the student's conversation history: " +
            feedback +
            '\nYour previous feedbacks will start like this"You (ChatGPT) have given the following feedback:" ' +
            '\nThe student\'s follow up questions will start like this "The student have asked the following in a follow up:" ' +
            "\nThe conversation may only have your initial feedback to the students' answer alone, or could be a history of chat between you and the student." +
            "\nGiven the above context, the student have entered a new prompt or a new follow up in the following." +
            "\nRespond to the student's new prompt or follow up as you would a computer science teacher, talking directly to the student" +
            "\nOutput only the response / feedback / comments.",
        },
        {
          role: "user",
          content: "New Prompt/follow up from the student: " + new_prompt,
        },
      ],
    });
    console.log(completion);

    // Handle response
    const newFeedback = getMessageContent(completion);

    console.log(completion);
    console.log(newFeedback);

    //database
    const updatedFeedback =
      feedback +
      "\n\nThe student have asked the following in a follow up: " +
      new_prompt +
      "\n\nYou (ChatGPT) have given the following feedback:" +
      newFeedback;

    console.log("updated feedback: " + updatedFeedback);
    //store and append the new feedback into the database
    //database call
    await updateFeedbackConversation(question_id, updatedFeedback);

    //Sending the response back to the frontend
    res
      .status(HTTP.OK_200)
      .json({ result: newFeedback, question_id: question_id });
  } catch (error) {
    handleError(error, res);
  }
});

function outputResult(result, res) {
  res.status(HTTP.OK_200).json({ result });
}

function outputCompletion(completion, res) {
  console.log(completion);
  console.log(completion.data.choices);
  outputResult(completion.data, res);
}

function outputMessageContent(completion, res) {
  const content = completion.data.choices[0].message.content;
  console.log(completion);
  console.log(content);
  outputResult(content, res);
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
