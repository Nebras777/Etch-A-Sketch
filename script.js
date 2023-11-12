const INITIAL_COLOR = '#ff0000'
const INITIAL_MODE = 'color'

const canvas = document.getElementById('canvas')
const colorPicker = document.getElementById('color-picker')
const colorButton = document.getElementById('color-button')
const randomButton = document.getElementById('random-button')
const rainbowButton = document.getElementById('rainbow-button')
const eraserButton = document.getElementById('eraser-button')
const fillButton = document.getElementById('fill-button')
const slider = document.getElementById('slider')

let color = INITIAL_COLOR
let mode = INITIAL_MODE
let mouseDown = false;

canvas.onmousedown = () => (mouseDown = true)
canvas.onmouseup = () => (mouseDown = false)
colorPicker.oninput = (e) => color = e.target.value
colorButton.onclick = () => mode = 'color'
randomButton.onclick = () => mode = 'random'
rainbowButton.onclick = () => mode = 'rainbow'
eraserButton.onclick = () => mode = 'eraser'

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

for (let i = 1; i <= 16**2; i++) {
    const content = document.createElement('div')
    content.classList.add('box')
    content.addEventListener('mouseover', changeColor)
    content.addEventListener('mousedown', changeColor)
    canvas.appendChild(content)
}

const fullCanvas = document.querySelectorAll('.box')

fillButton.onclick = () => fullCanvas.forEach(coloring)