const canvas = document.getElementById('canvas')
let mouseDown = false;

canvas.onmousedown = () => (mouseDown = true)
canvas.onmouseup = () => (mouseDown = false)

function changeColor(e) {
    if (!(e.type === 'mouseover' && !mouseDown)) {
        e.target.style.backgroundColor = 'red'
    }
}

for (let i = 1; i <= 16**2; i++) {
    const content = document.createElement('div')
    content.classList.add('box')
    content.addEventListener('mouseover', changeColor)
    content.addEventListener('mousedown', changeColor)
    canvas.appendChild(content)
}