import * as acorn from "acorn";

const codeEditor = document.querySelector("#code");
const runButton = document.querySelector("#run");

runButton.addEventListener("click", () => {
  const code = codeEditor.value;
  const ast = acorn.parse(code, {
    sourceType: "module",
  });

  console.log(getScopeChain([], ast), ast);
});

function getScopeChain(scopeChain, ast) {
  if (ast.type === "VariableDeclaration") {
    scopeChain.push(ast.declarations[0].id.name);
  }
  if (ast.type === "Program") {
    scopeChain.push("Global");
    return scopeChain;
  }
  if (ast.body.length !== 0) {
    ast.body.forEach((body) => {
      getScopeChain(scopeChain, body);
    });
  }
  return scopeChain;
}
