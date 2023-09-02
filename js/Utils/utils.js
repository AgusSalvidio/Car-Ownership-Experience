export { unloadPreviousView, rootDiv };

function rootDiv() {
  return document.querySelector("#root");
}

function unloadPreviousView(applicationContext) {
  let div = rootDiv();
  div.remove();
  let main = document.querySelector("main");
  let newRootDiv = document.createElement("div");
  newRootDiv.setAttribute("id", "root");
  main.append(newRootDiv);
}
