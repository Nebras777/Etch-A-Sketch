const INITIAL_COLOR = '#ff0000'
const INITIAL_MODE = 'color'

const canvas = document.getElementById('canvas')
const colorPicker = document.getElementById('color-picker')
const colorButton = document.getElementById('color-button')
const randomButton = document.getElementById('random-button')
const rainbowButton = document.getElementById('rainbow-button')

let color = INITIAL_COLOR
let mode = INITIAL_MODE
let mouseDown = false;

canvas.onmousedown = () => (mouseDown = true)
canvas.onmouseup = () => (mouseDown = false)
colorPicker.oninput = (e) => color = e.target.value
colorButton.onclick = () => mode = 'color'
randomButton.onclick = () => mode = 'random'
rainbowButton.onclick = () => mode = 'rainbow'

function changeColor(e) {
    if (!(e.type === 'mouseover' && !mouseDown)) {
        if (mode === 'color') {
            e.target.classList.remove('rainbow')
            e.target.style.backgroundColor = color
        } else if (mode === 'random') {
            e.target.classList.remove('rainbow')
            red = Math.floor(Math.random() * 256)
            green = Math.floor(Math.random() * 256)
            blue = Math.floor(Math.random() * 256)
            e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
        } else if (mode === 'rainbow') {
            e.target.classList.add('rainbow')
        }
    }
}

for (let i = 1; i <= 16**2; i++) {
    const content = document.createElement('div')
    content.classList.add('box')
    content.addEventListener('mouseover', changeColor)
    content.addEventListener('mousedown', changeColor)
    canvas.appendChild(content)
}

