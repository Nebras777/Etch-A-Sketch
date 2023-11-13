const INITIAL_COLOR = '#ff0000'
const INITIAL_MODE = 'color'
const INITIAL_SIZE = 16

const canvas = document.getElementById('canvas')
const colorPicker = document.getElementById('color-picker')
const colorButton = document.getElementById('color-button')
const randomButton = document.getElementById('random-button')
const rainbowButton = document.getElementById('rainbow-button')
const eraserButton = document.getElementById('eraser-button')
const fillButton = document.getElementById('fill-button')
const clearButton = document.getElementById('clear-button')
const sizeInput = document.getElementById('size-input')
const sizeText = document.getElementById('size-text')

let color = INITIAL_COLOR
let mode = INITIAL_MODE
let size = INITIAL_SIZE
let mouseDown = false;

canvas.onmousedown = () => (mouseDown = true)
canvas.onmouseup = () => (mouseDown = false)
colorPicker.oninput = (e) => {color = e.target.value; mode = 'color'}
colorButton.onclick = () => {mode = 'color'; activeButton()}
randomButton.onclick = () => {mode = 'random'; activeButton()}
rainbowButton.onclick = () => {mode = 'rainbow'; activeButton()}
eraserButton.onclick = () => {mode = 'eraser'; activeButton()}
clearButton.onclick = () => clearGrid()
sizeInput.onchange = (e) => sizeChange(e)

activeButton()

function gridChange(amount) {
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (let i = 1; i <= amount**2; i++) {
        const content = document.createElement('div')
        content.classList.add('box')
        content.addEventListener('mouseover', changeColor)
        content.addEventListener('mousedown', changeColor)
        canvas.appendChild(content)
    }
}

gridChange(16)

let fullCanvas = document.querySelectorAll('.box')

fillButton.onclick = () => fillGrid()

function fillGrid() {
    if (mode === "eraser") {
        alert("Cannot fill in eraser mode. Please pick another mode, or clear instead.")
    } else {
        fullCanvas = document.querySelectorAll('.box')
        fullCanvas.forEach(coloring)
    }
}

function clearGrid() {
    fullCanvas = document.querySelectorAll('.box')
    mode = 'eraser'
    fullCanvas.forEach(coloring)
    mode = 'color'
}

function coloring(item) {
    if (mode === 'color') {
        item.classList.remove('rainbow')
        item.style.backgroundColor = color
    } else if (mode === 'random') {
        item.classList.remove('rainbow')
        red = Math.floor(Math.random() * 256)
        green = Math.floor(Math.random() * 256)
        blue = Math.floor(Math.random() * 256)
        item.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
    } else if (mode === 'rainbow') {
        item.classList.add('rainbow')
    } else if (mode === 'eraser') {
        item.classList.remove('rainbow')
        item.style.backgroundColor = 'white'
    }
}

function changeColor(e) {
    if (!(e.type === 'mouseover' && !mouseDown)) {
        coloring(e.target)
    }
}

function sizeChange(e) {
    if (e.target.value < 1 || e.target.value > 64) {
        alert("Minimum is 1. Maximum is 64.")
        e.target.value = size
    } else {
        clearGrid()
        size = e.target.value
        sizeText.textContent = `Size: ${size}x${size}`
        gridChange(size)
    }
}

function activeButton() {
    if (mode === 'color') {
        colorButton.classList.add('active')
        randomButton.classList.remove('active')
        rainbowButton.classList.remove('active')
        eraserButton.classList.remove('active')
    } else if (mode === 'random') {
        colorButton.classList.remove('active')
        randomButton.classList.add('active')
        rainbowButton.classList.remove('active')
        eraserButton.classList.remove('active')
    } else if (mode === 'rainbow') {
        colorButton.classList.remove('active')
        randomButton.classList.remove('active')
        rainbowButton.classList.add('active')
        eraserButton.classList.remove('active')
    } else {
        colorButton.classList.remove('active')
        randomButton.classList.remove('active')
        rainbowButton.classList.remove('active')
        eraserButton.classList.add('active')
    }
}
