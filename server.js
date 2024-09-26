import express from "express";

const server = express();


server.get("/", (req, res) => {
  res.send("Welcome Guys!")
})
server.listen(4000, () => {
  console.log("Server is running on PORT number 4000");

})