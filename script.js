const canvas = document.getElementById('graphCalculator');
const ctx = canvas.getContext('2d');
const input = document.getElementById('funcInput');

const config = {
    gridColor: "#333333",
    axisColor: "#ffffff",
    textColor: "#888888",
    lineColor: "#00d2ff",
    lineWidth: 4,
    glow: true
};

let width, height;
let scale = 40; 
let camera = { x: 0, y: 0 };

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    draw();
}

function draw() {
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, width, height);
}

window.addEventListener('resize', resize);
resize()


function toMathX(px) { return (px - width / 2) / scale + camera.x; }
function toMathY(py) { return -(py - height / 2) / scale + camera.y; }
function toPixelX(mx) { return (mx - camera.x) * scale + width / 2; }
function toPixelY(my) { return -((my - camera.y) * scale) + height / 2; }


function drawGrid() {
    ctx.lineWidth = 1;
    ctx.font = "12px Arial";
    ctx.fillStyle = config.textColor;


    for (let x = -10; x <= 10; x++) {
        let px = toPixelX(x);
        ctx.strokeStyle = x === 0 ? config.axisColor : config.gridColor;
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, height);
        ctx.stroke();
    }
    
}


function draw() {
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, width, height);
    drawGrid(); 
}


