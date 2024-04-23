import express from "express";

const app = express();

let requestCount = 0;

app.use(function middleware(req: any, res: any, next: any) {
  requestCount++;
  console.log("middleware ran....");
  next();
});

app.get("/", (req: any, res: any) => {
  res.send("Hello world");
});

app.get("/requestCount", (req: any, res: any) => {
  res.json({
    requestCount,
  });
});

app.listen(3000);
