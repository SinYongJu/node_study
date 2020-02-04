const fs = require("fs"); // filesystme
const path = require("path"); // filesystme

const CREATE_FOLDER_NAME = "_temp";

const getCreateDate = () =>
  new Date()
    .toISOString()
    .replace(/-/g, "")
    .split("T")[0];

/**
    writefilePath = path.resolve(__dirname, filename)
    fs.existsSync(path)
    fs.mkdirSync(path)
    fs.writeFileSync($path, content, encode)
 */

// get templates
const getTemplate = $path => {
  console.log("getTemplate", $path);
};

// create file
const createFile = ($path, content) => {
  console.log("createFile", $path, content);
};

// create folder
const createFolder = $path => {
  return !fs.existsSync($path) && fs.mkdirSync($path);
};

// create
const create = name => {
  console.log("create");
  // create temp Folder
  const createDate = getCreateDate();
  const tempFileName = createDate + name;
  const tempFolderPath = path.resolve(__dirname, tempFileName);
  createFolder(tempFolderPath);
  // create folder in temp
  const imageFolderName = path.resolve(tempFolderPath, "images");
  createFolder(imageFolderName);
};

// 실행부
create(CREATE_FOLDER_NAME);
