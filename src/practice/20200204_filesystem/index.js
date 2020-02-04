const fs = require("fs"); // filesystme
const path = require("path"); // filesystme

// get templates
const getTemplate = $path => {
  console.log("getTemplate", $path);
};

// create file
const createFile = ($path, content) => {
  console.log("createFile", $path, content);
};

// create folder
const createFolder = ($path, name) => {
  console.log("createFolder", $path, name);
};

// create
const create = () => {
  console.log("create");
};

// 실행부
create();
