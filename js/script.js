const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "selected-color";
const GRID_COLOR = "#f1f5f9";
const DEFAULT_SIZE = 16;

let selectedColor = DEFAULT_COLOR;
let selectedMode = DEFAULT_MODE;
let selectedSize = DEFAULT_SIZE;
let mouseDown = false;

const grid = document.querySelector(".grid");
const colorWheel = document.querySelector(".color-wheel");
const selectedColorButton = document.querySelector("#selected-color");
const randomColorButton = document.querySelector("#random-color");
const eraseColorButton = document.querySelector("#erase-color");
const clearGridButton = document.querySelector("#clear-grid");
const sizeSlider = document.querySelector("#grid-slider");
const toggleBorderButton = document.querySelector("#toggle-borders");

changeSize(selectedSize);
createGrid(selectedSize);

colorWheel.addEventListener("change", changeSelectedColor);
selectedColorButton.addEventListener("click", changeMode);
randomColorButton.addEventListener("click", changeMode);
eraseColorButton.addEventListener("click", changeMode);
clearGridButton.addEventListener("click", () => {
  createGrid(selectedSize);
});
sizeSlider.addEventListener("mousemove", (event) => { changeSize(event.target.value);});
sizeSlider.addEventListener("change", (event) => {
  changeSize(event.target.value);
  createGrid(selectedSize);
});
toggleBorderButton.addEventListener("click", toggleBorder);
grid.addEventListener("mousedown", () => {
  mouseDown = true;
});
grid.addEventListener("mouseup", () => {
  mouseDown = false;
});
grid.addEventListener("mousedown", colorBlock);
grid.addEventListener("mouseover", colorBlock);

function changeMode(event) {
  const button = event.target;
  const buttonID = button.id;
  if (selectedMode === buttonID) return;
  const otherSelectedButton = document.getElementById(selectedMode);
  otherSelectedButton.classList.remove("active");
  button.classList.add("active");
  selectedMode = buttonID;
}

function changeSize(size) {
  selectedSize = size;
  const sizeText = document.querySelector(".grid-size");
  sizeText.textContent = `${selectedSize} x ${selectedSize}`;
}

function changeSelectedColor() {
  selectedColor = colorWheel.value;
}

function createGrid(size) {
  clearGrid();
  setGrid(size);
}

function clearGrid() {
  grid.innerHTML = "";
}

function setGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    let gridBlock = document.createElement("block");
    gridBlock.classList.add("grid-block");
    if (toggleBorderButton.classList.contains("active"))
      gridBlock.classList.add("border");
    grid.append(gridBlock);
  }
}

function colorBlock(event) {
  console.log(event);
  if (!mouseDown) return;
  let target = event.target;
  if (target.nodeName != "BLOCK") return;
  if (selectedMode === "selected-color")
    target.style.background = `${selectedColor}`;
  else if (selectedMode === "random-color") {
    const RED = Math.floor(Math.random() * 256);
    const BLUE = Math.floor(Math.random() * 256);
    const GREEN = Math.floor(Math.random() * 256);
    target.style.background = `rgb(${RED}, ${GREEN}, ${BLUE})`;
  } 
  else
    target.style.background = `${GRID_COLOR}`;
}

function toggleBorder() {
  for (const block of grid.children) block.classList.toggle("border");
  toggleBorderButton.classList.toggle("active");
}
