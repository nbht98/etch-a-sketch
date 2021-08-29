const container = document.querySelector(".container");
const line = document.querySelector(".grid-line");
const clear = document.querySelector(".grid-clear");
const eraser = document.querySelector(".grid-eraser");
const colorPicker = document.querySelector("#color-picker");
const buttons = document.querySelectorAll("button");

let slider = document.querySelector("#range");
let output = document.querySelector(".value");
let gridItem;
let fill = false;
let color = "black";

colorPicker.onchange = (e) => setCurrentColor(e);
clear.onclick = (e) => removeColor();
eraser.onclick = (e) => {
  color = color == "white" ? colorPicker.value : "white";
  e.target.classList.toggle("button-click");
};
line.onclick = (e) => {
  if (line.value == "hide") {
    showGridline();
    line.value = "show";
    e.target.classList.toggle("button-click");
  } else {
    hideGridline();
    line.value = "hide";
    e.target.classList.toggle("button-click");
  }
};
slider.oninput = (e) => changeGrid(e);

const makeGrid = (rows) => {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", rows);
  for (c = 0; c < rows * rows; c++) {
    let cell = document.createElement("div");
    cell.addEventListener("mousedown", changeColor);
    cell.addEventListener("mouseenter", changeColorFill);
    cell.addEventListener("mouseup", () => {
      fill = false;
    });
    container.appendChild(cell).className = "grid-item bordered";
  }
};

const setCurrentColor = (newColor) => {
  color = newColor.target.value;
  newColor.value = newColor.target.value;
};

const changeGrid = (e) => {
  output.innerHTML = `Grid size: ${e.target.value} x ${e.target.value}`;
  removeGrid();
  makeGrid(e.target.value);
};

const changeColor = (item) => {
  item.target.style.backgroundColor = color;
  fill = true;
};

const changeColorFill = (item) => {
  if (fill) {
    item.target.style.backgroundColor = color;
  }
};

const hideGridline = () => {
  gridItems = document.querySelectorAll(".grid-item");
  for (gridItem of gridItems) {
    gridItem.classList.remove("bordered");
  }
};

const showGridline = () => {
  gridItems = document.querySelectorAll(".grid-item");
  for (gridItem of gridItems) {
    gridItem.classList.add("bordered");
  }
};

const removeGrid = () => {
  while (container.firstChild) container.removeChild(container.firstChild);
};

const removeColor = () => {
  gridItems = document.querySelectorAll(".grid-item");
  for (gridItem of gridItems) {
    gridItem.style.backgroundColor = "white";
  }
};

window.onload = () => {
  makeGrid(slider.value);
  output.innerHTML = `Grid size: ${slider.value} x ${slider.value}`;
  eraser.classList.toggle("button-click");
};
