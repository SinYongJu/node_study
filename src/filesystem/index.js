const fs = require("fs");
const path = require("path");

const FILE_NAME = "test.json";
const ENCODE_TYPE_UTF8 = "utf8";
// const path = __dirname + "/test.json";
/**
 * 단 내장 객체 path 의 사용시 os 별로 dir이 다를수 있다
 * path 라는 객체의 resolve를 사용 하도록 하자
 * 앞 뒤의 path를 합치겠습니다
 * join : 상대경로 (절대 경로 일수도)
 * resolve : 항상 절대경로
 */
const filePath = path.resolve(__dirname, FILE_NAME);
const result = fs.readFileSync(filePath, ENCODE_TYPE_UTF8);

console.log(result);

// file write
// 1. dir path
// 2. file name
// 3. writefilePath = path.resolve(__dirname, filename)
// 4. encode check
// content -> string json..

/**
 * 나는 디렉토리를 만들고 싶어
 * 근데 그 디렉토리가 있는지 확인은 해야행 fs.existsSync(path)
 * fs.mkDirSync(path)
 */

// temp 만들기
const dirPath = "temp";
const imageDirPath = "Img";

const files = {
  indexJsName: `index.js`,
  indexHtmlName: `index.html`,
  indexCssName: `index.css`,
  dataJsonName: `data.json`,
  configJsonName: `config.json`
};
const images = {
  a: "a.png",
  b: "b.png"
};
const mkDirPath = path.resolve(__dirname, dirPath);
const imgDirPath = path.resolve(mkDirPath, imageDirPath);

/**
 *
 *  util 화
 */
function readFile($path) {
  return !fs.existsSync($path) && fs.readFileSync($path);
}
function createDir($path) {
  return !fs.existsSync($path) && fs.mkdirSync($path);
}
function createFile($path, content, encode = ENCODE_TYPE_UTF8) {
  return !fs.existsSync($path) && fs.writeFileSync($path, content, encode);
}

function createUnit($path, ref) {
  createDir($path);
  Object.keys(ref).forEach(filename => {
    createFile(path.resolve($path, ref[filename]));
  });
}

function create() {
  createUnit(mkDirPath, files);
  createUnit(imgDirPath, images);
  const result = readFile(mkDirPath);
  console.log(result);
}

create();
