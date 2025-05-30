import * as acorn from "acorn";

const codeEditor = document.querySelector("#code");
const runButton = document.querySelector("#run");

runButton.addEventListener("click", () => {
  const code = codeEditor.value;
  const ast = acorn.parse(code, {
    sourceType: "module",
  });

  const path = [];

  const scopeChainList = getScopeChain(ast, path);
  const resultDiv = document.querySelector("#result");
  resultDiv.innerHTML = renderScopeChain(scopeChainList);
});

function renderScopeChain(scopeChainList) {
  return scopeChainList
    .map((item) => {
      return `<div>${item.name}'s Scope Chain: <br/>${item.scopeChain
        .split("-")
        .map(
          (scope, index) =>
            `<div style="margin-left: ${index > 1 ? (index - 1) * 15 : 0}px;">${
              index !== 0 ? "└ " : ""
            }${scope}</div>`
        )
        .join("")} type: ${item.type}</div>`;
    })
    .join("");
}

function getScopeChain(ast, currentPath) {
  const result = [];
  if (ast.type === "Program") {
    currentPath.push("global");
    result.push(createScopeItem(currentPath, "Global", "global"));
  }
  if (ast.type === "VariableDeclaration") {
    const declarations = ast.declarations;
    const name = getDeclarationName(declarations[0]);
    const newPath = extendPath(currentPath, name);
    if (isArrowFunction(declarations[0])) {
      result.push(createScopeItem(newPath, name, "arrow-function"));
      addScope(result, declarations[0].init.body, newPath);
    } else {
      result.push(createScopeItem(newPath, name, "variable"));
    }
  }
  if (ast.type === "FunctionDeclaration") {
    const newPath = extendPath(currentPath, ast.id.name);
    result.push(createScopeItem(newPath, ast.id.name, "function"));
    addScope(result, ast.body, newPath);
  }

  if (ast.body && ast.body.length > 0) {
    ast.body.forEach((body) => {
      addScope(result, body, currentPath);
    });
  }

  return result;
}

const isArrowFunction = (declaration) =>
  declaration.init && declaration.init.type === "ArrowFunctionExpression";

const getDeclarationName = (declaration) => declaration.id.name;

const extendPath = (currentPath, newPath) => [...currentPath, newPath];

const addScope = (result, node, currentPath) => {
  const scopeChain = getScopeChain(node, currentPath);
  result.push(...scopeChain);
};

const createScopeItem = (currentPath, name, type) => ({
  scopeChain: currentPath.join("-"),
  name: name,
  type: type,
});
