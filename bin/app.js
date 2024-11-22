#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { Command } = require("commander");
const { installPackages } = require("../src/dependencies/execDependency");
const { createIndex, createDotEnvFile } = require("../src/fs/createIndex");

const program = new Command();

program
  .name("nem")
  .description(
    "CLI to create a Node.js, Express, MongoDB project with boilerplate code"
  )
  .version("1.0.0");

program
  .command("create <dirName>")
  .description("Create a new project with node, express, mongodb with defaults")
  .action((dirName) => {
    const currentDir = process.cwd();
    const dirPath = path.join(currentDir, dirName);

    // Check if the directory already exists
    if (fs.existsSync(dirPath)) {
      console.log(`Directory "${dirName}" already exists.`);
      return;
    }

    // Create the directory
    fs.mkdirSync(dirPath);
    console.log(`Project "${dirName}" initiated.`);

    // Change to the newly created directory
    process.chdir(dirPath);

    //installing the dependecies
    installPackages();

    // Read and write content from a template file (source file) to index.js
    createIndex(dirPath);

    //creating  .env file
    createDotEnvFile(dirPath);

    console.log("\x1b[32m\nSetup complete!\n\x1b[0m");
    console.log("Things to do:\n");
    console.log("\t1. cd " + dirName);
    console.log("\t2. npm install");
    console.log("\t3. Add your MongoDB URI to .env file");
    console.log("\t4. nodemon index.js\n");
  });

// Parse the command-line arguments
program.parse(process.argv);
