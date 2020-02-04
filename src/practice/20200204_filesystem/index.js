const fs = require("fs"); // filesystme
const path = require("path"); // filesystme

const ENCODING_UTF8 = "utf-8";
const CREATE_FOLDER_NAME = "_temp";
const CREATE_MODE = {
  DEFAULT: "default",
  INLINE: "inline"
};

const getArgs = slicedBy => process.argv.slice(slicedBy);
const getArgsByKey = (args, key) => {
  let argObj = {};
  args.forEach(arg => {
    const splitedArgs = arg.split("=");
    const argKey = splitedArgs[0];
    const argValue = splitedArgs[1];
    argObj[argKey] = argValue;
    return argObj;
  });
  return argObj[key];
  // => reduce로
};
const args = getArgs(2);
const argMode = getArgsByKey(args, "mode");
const argType = getArgsByKey(args, "type");
const argJsModule = getArgsByKey(args, "jsModule");

// readFile
const readFile = ($path, encodeType = ENCODING_UTF8) =>
  fs.existsSync($path) && fs.readFileSync($path, encodeType);

const getCreateTemplatePath = (mode, target, filename) =>
  path.resolve(__dirname, "templates", mode, target, filename);

// get templates
const getTemplateWithReadFile = (mode, target, filename) => {
  const $tempPath = getCreateTemplatePath(mode, target, filename);
  return readFile($tempPath);
};

// const getTemplate = $path => {
//   return readFile($path);
// };

const CREATE_FORMATS_IN_TEMPLATES = {
  [CREATE_MODE.DEFAULT]: {
    html: getTemplateWithReadFile(CREATE_MODE.DEFAULT, "html", "index.html"),
    css: getTemplateWithReadFile(CREATE_MODE.DEFAULT, "css", "index.css"),
    data: getTemplateWithReadFile(CREATE_MODE.DEFAULT, "json", "data.json"),
    config: getTemplateWithReadFile(CREATE_MODE.DEFAULT, "json", "config.json"),
    js: getTemplateWithReadFile(CREATE_MODE.DEFAULT, "js", "index.js")
  },
  [CREATE_MODE.INLINE]: {
    html: getTemplateWithReadFile(CREATE_MODE.INLINE, "html", "index.html"),
    css: {
      pc: getTemplateWithReadFile(CREATE_MODE.INLINE, "css", "pc.css"),
      mo: getTemplateWithReadFile(CREATE_MODE.INLINE, "css", "mo.css")
    },
    js: {
      common: getTemplateWithReadFile(
        CREATE_MODE.INLINE,
        "js/common",
        "common.js"
      )
    },
    data: getTemplateWithReadFile(CREATE_MODE.DEFAULT, "json", "data.json"),
    config: getTemplateWithReadFile(CREATE_MODE.DEFAULT, "json", "config.json")
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

const createFileUnitDefaultMode = async (rootFolderPath, createMode) => {
  await createFolder(rootFolderPath);
  // create index.html
  await createFile(rootFolderPath, "index.html", createMode.html);
  // create index.css
  await createFile(rootFolderPath, "index.css", createMode.css);
  // create config.json
  await createFile(rootFolderPath, "config.json", createMode.config);
  // create data.json
  await createFile(rootFolderPath, "data.json", createMode.data);
  // create index.js
  await createFile(rootFolderPath, "index.js", createMode.js);
};

const createFileUnitInlineMode = async (
  rootFolderPath,
  createMode,
  type,
  jsModule
) => {
  await createFolder(rootFolderPath);
  const css = createMode.css[type];
  const js = createMode.js[jsModule];
  const { createHtml } = require("./templates/inline/html/");
  await createFile(rootFolderPath, "index.html", createHtml(css, js));
  // create config.json
  await createFile(rootFolderPath, "config.json", createMode.config);
  // create data.json
  await createFile(rootFolderPath, "data.json", createMode.data);
};
// create
const create = async (
  name,
  mode = CREATE_MODE.INLINE,
  type = "pc",
  jsModule = "common"
) => {
  const createMode = CREATE_FORMATS_IN_TEMPLATES[mode];
  console.log("create", mode, mode !== "default");
  // create temp Folder
  const createDate = getCreateDate();
  const rootFileName = createDate + name;
  const rootFolderPath = path.resolve(__dirname, rootFileName);

  if (mode === "default") {
    await createFileUnitDefaultMode(rootFolderPath, createMode);
  } else {
    await createFileUnitInlineMode(rootFolderPath, createMode, type, jsModule);
  }

  // create imgages folder in temp
  const imageFolderPath = path.resolve(rootFolderPath, "images");
  await createFolder(imageFolderPath);
  await createFile(imageFolderPath, "a.png");
  await createFile(imageFolderPath, "b.png");
  console.log("create done");
};

// 실행부
create(CREATE_FOLDER_NAME, argMode, argType, argJsModule);
