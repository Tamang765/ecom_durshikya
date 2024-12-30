import chalk from "chalk";
import fs from "fs";
import os from "os";
import path from "path";

// const fs = require("fs"); //common js
// const path = require("path");
// const chalk = require("chalk");
function subtract() {
  return 2 - 1;
}

console.log(chalk.red("Hello world!"));

console.log(os.machine());

console.log(subtract());

// synchronous
fs.writeFileSync("texts.txt", "hello world");

// asynchronous
fs.writeFile("async.txt", "this is async", (err) => {
  console.log(err);
});

fs.appendFile("async.txt", "/n hello world ", (err) => {
  console.log(err);
});

// reading file

fs.readFile("async.txt", "utf8", (err, data) => {
  console.log(data);
});

// deleting file
fs.unlink("async.txt", (err) => {
  console.log(err);
});

// creating directory

// fs.mkdirSync("text");

// creating file inside directory

// fs.writeFileSync(path.join("test", "test.txt"), "this is a test file");

//asynchronous

fs.writeFile(path.join("test", "test.txt"), "this is a test file", (err) => {
  console.log(err);
});

// // deleting directory
// fs.unlink("test/test.txt", (err) => {
//   console.log(err);
// });
// fs.unlink("test/async.txt", (err) => {
//   console.log(err);
// });
// fs.rmdirSync("test");



