const fs = require("fs"); // filesystme
const path = require("path"); // filesystme

const CREATE_FOLDER_NAME = "_temp";
const ENCODING_UTF8 = "utf-8";

const CREATE_MODE = {
  DEFAULT: "DEFAULT"
};

const getCreateTemplatePath = (mode, target, filename) =>
  path.resolve(__dirname, "templates", mode, target, filename);

const CREATE_FORMATS_IN_TEMPLATES = {
  [CREATE_MODE.DEFAULT]: {
    html: getCreateTemplatePath(CREATE_MODE.DEFAULT, "html", "index.html"),
    css: getCreateTemplatePath(CREATE_MODE.DEFAULT, "css", "index.css"),
    data: getCreateTemplatePath(CREATE_MODE.DEFAULT, "json", "data.json"),
    config: getCreateTemplatePath(CREATE_MODE.DEFAULT, "json", "config.json"),
    js: getCreateTemplatePath(CREATE_MODE.DEFAULT, "js", "index.js")
  }
};

const getCreateDate = () => Math.random() * 100;

//   new Date()
//     .toISOString()
//     .replace(/-/g, "")
//     .split("T")[0];

/**
    writefilePath = path.resolve(__dirname, filename)
    fs.existsSync(path)
    fs.mkdirSync(path)
    fs.writeFileSync($path, content, encode)
 */

// readFile
const readFile = ($path, encodeType = ENCODING_UTF8) =>
  fs.existsSync($path) && fs.readFileSync($path, encodeType);

// get templates
const getTemplate = $path => {
  return readFile($path);
};

// create file
const createFile = ($path, name, content) => {
  let filePath = path.resolve($path, name);
  return (
    !fs.existsSync(filePath) &&
    fs.writeFileSync(filePath, content, ENCODING_UTF8)
  );
};

// create folder
const createFolder = $path => {
  return !fs.existsSync($path) && fs.mkdirSync($path);
};

// create
const create = async (name, mode = CREATE_MODE.DEFAULT) => {
  const createMode = CREATE_FORMATS_IN_TEMPLATES[mode];
  console.log("create");
  // create temp Folder
  const createDate = getCreateDate();
  const rootFileName = createDate + name;
  const rootFolderPath = path.resolve(__dirname, rootFileName);
  await createFolder(rootFolderPath);
  // create index.html
  await createFile(rootFolderPath, "index.html", getTemplate(createMode.html));
  // create index.css
  await createFile(rootFolderPath, "index.css", getTemplate(createMode.css));
  // create config.json
  await createFile(
    rootFolderPath,
    "config.json",
    getTemplate(createMode.config)
  );
  // create data.json
  await createFile(rootFolderPath, "data.json", getTemplate(createMode.data));
  // create index.js
  await createFile(rootFolderPath, "index.js", getTemplate(createMode.js));

  // create imgages folder in temp
  const imageFolderPath = path.resolve(rootFolderPath, "images");
  await createFolder(imageFolderPath);
  await createFile(imageFolderPath, "a.png");
  await createFile(imageFolderPath, "b.png");
  console.log("create done");
};

// 실행부
create(CREATE_FOLDER_NAME);
