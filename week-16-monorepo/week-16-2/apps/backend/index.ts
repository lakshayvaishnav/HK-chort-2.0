import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "hii from backend....",
  } as any);
});

app.listen(3000, () => {
  console.log("app is runnign on 3000");
});
