import * as acorn from "acorn";

const codeEditor = document.querySelector("#code");
const runButton = document.querySelector("#run");

runButton.addEventListener("click", () => {
  const code = codeEditor.value;
  const ast = acorn.parse(code, {
    sourceType: "module",
  });

  console.log(ast);
  const path = [];

  const scopeChainList = getScopeChain(ast, path);
  console.log(scopeChainList);
});

function getScopeChain(ast, currentPath) {
  const result = [];
  if (ast.type === "Program") {
    currentPath.push("Global");
    result.push({
      scopeChain: currentPath.join(","),
      name: "Global",
      type: "global",
    });
  }
  if (ast.type === "VariableDeclaration") {
    result.push({
      scopeChain: currentPath.join("-"),
      name: ast.declarations[0].id.name,
      type: "variable",
    });
  }
  if (ast.type === "FunctionDeclaration") {
    result.push({
      scopeChain: currentPath.join(","),
      name: ast.id.name,
      type: "function",
    });
    const scopeChain = getScopeChain(ast.body, [...currentPath, ast.id.name]);
    result.push(...scopeChain);
  }

  if (ast.body && ast.body.length > 0) {
    ast.body.forEach((body) => {
      const scopeChain = getScopeChain(body, currentPath);
      result.push(...scopeChain);
    });
  }

  return result;
}
