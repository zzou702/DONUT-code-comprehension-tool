import { ServerApiVersion, MongoClient, ObjectId } from "mongodb";
import { config } from "dotenv";

config();

//MongoDB driver connection
const mongoDB_uri = process.env.MONGODB_URI;
const dbName = "DONUT-code-comprehension";

const client = new MongoClient(mongoDB_uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  await client.connect();
}

async function close() {
  if (client) {
    await client.close();
  }
}

export async function insertQuizFromPrompt(prompt, program, student_id) {
  //Database insertion
  const data = {
    prompt: prompt,
    program: program,
    generate_more_clicked: 0,
    student_id: student_id,
  };

  try {
    await connect();
    const insertedQuiz = await client
      .db(dbName)
      .collection("Quiz")
      .insertOne(data);
    const program_id = insertedQuiz.insertedId;
    console.log("Inserted quiz with id: " + insertedQuiz.insertedId);
    return program_id;
  } finally {
    await close();
  }
}

export async function insertQuizFromCustomCode(program, student_id) {
  //Database insertion
  const data = {
    prompt: "No prompt entered",
    program: program,
    generate_more_clicked: 0,
    student_id: student_id,
  };

  try {
    await connect();
    const insertedQuiz = await client
      .db(dbName)
      .collection("Quiz")
      .insertOne(data);
    const program_id = insertedQuiz.insertedId;
    console.log("Inserted quiz with id: " + insertedQuiz.insertedId);
    return program_id;
  } finally {
    await close();
  }
}

export async function insertQAFeedback(
  student_id,
  program_id,
  question,
  answer,
  difficulty,
  feedback
) {
  //Database insertion
  //quiz_id is the program_id
  const data = {
    student_id: student_id,
    quiz_id: program_id,
    question: question,
    answer: answer,
    difficulty: difficulty,
    feedback: "You (ChatGPT) have given the following feedback: \n" + feedback,
  };

  try {
    await connect();
    const insertedQuestionDetail = await client
      .db(dbName)
      .collection("QuestionDetails")
      .insertOne(data);
    const question_id = insertedQuestionDetail.insertedId;
    console.log("Inserted quiz with id: " + insertedQuestionDetail.insertedId);
    return question_id;
  } finally {
    await close();
  }
}

export async function incrementGenerateMoreClicked(program_id) {
  try {
    await connect();
    await client
      .db(dbName)
      .collection("Quiz")
      .updateOne({ _id: program_id }, { $inc: { generate_more_clicked: 1 } });
    console.log("Updated quiz with id: " + program_id);
  } finally {
    await close();
  }
}

export async function getQuestionDetailsById(question_id) {
  console.log("question_id: " + question_id);
  try {
    await connect();
    const questionDetails = await client
      .db(dbName)
      .collection("QuestionDetails")
      .findOne({ _id: new ObjectId(question_id) });
    console.log("Retrieved question details: " + questionDetails);
    return questionDetails;
  } finally {
    await close();
  }
}

export async function getQuizById(quiz_id) {
  try {
    await connect();
    const quiz = await client
      .db(dbName)
      .collection("Quiz")
      .findOne({ _id: new ObjectId(quiz_id) });
    console.log("Retrieved quiz with id: " + quiz);
    return quiz;
  } finally {
    await close();
  }
}

export async function updateFeedbackConversation(question_id, updatedFeedback) {
  try {
    await connect();
    await client
      .db(dbName)
      .collection("QuestionDetails")
      .updateOne(
        { _id: new ObjectId(question_id) },
        { $set: { feedback: updatedFeedback } }
      );
    console.log("Updated feedback conversation with id: " + question_id);
  } finally {
    await close();
  }
}
