console.log("hello world");

const __add = (a, b) => a + b;

console.log(__add(1, 2));

process.env.NODE_ENV = "PROD"; // DEV
console.log("process.argv", process.argv);

// process 객체에 먼가 추가 하고 싶으다

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
console.log("process.argv getArgs", getArgs(2));
const args = getArgs(2);
console.log("process.argv getArgsByKey", getArgsByKey(args, "name"));
