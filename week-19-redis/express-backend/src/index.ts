import express, { json } from "express";
import { createClient } from "redis";

const app = express();
app.use(json());
const client = createClient();
client.connect();

app.get("/", (req, res) => {
  console.log("server running fine...");
});

app.post("/submit", async (req, res) => {
  const { problemId, userId, code, language } = req.body;
  // first arguement is the name of the queue...
  await client.lPush(
    "submissions",
    JSON.stringify({ problemId, userId, code, language })
  );
  res.json({
    message: "submission recieved !",
  });
});
app.listen(3000, () => {
  console.log("app is running ....");
});
