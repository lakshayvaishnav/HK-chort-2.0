import express from "express";
import cluster from "cluster";
import os from "os";

const totalCpu = os.cpus().length;

const port = 3000;

if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${totalCpu}`);
  console.log(`Primary ${process.pid} is running`);

  // Fork Workers.
  for (let i = 0; i < totalCpu; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log(`Let's fork another worker !!!`);
    cluster.fork();
  });
} else {
  const app = express();
  console.log(`worker ${process.pid} started`);

  app.get("/", (req, res) => {
    res.send("Hello world app is runnning ");
  });

  app.get("/api/:n", function (req, res) {
    let n = parseInt(req.params.n);

    let count = 0;
    if (n > 5000000) n = 500000;
    for (let i = 0; i < n; i++) {
      count += i;
    }
    res.send(`Final count is ${count} ${process.pid}`);
  });
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}