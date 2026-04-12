const canvas = document.getElementById('graphCalculator');
const ctx = canvas.getContext('2d');
const funcInput = document.getElementById('funcInput');


let scale = 40; 
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let dragStartX, dragStartY;


function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (offsetX === 0 && offsetY === 0) {
        offsetX = canvas.width / 2;
        offsetY = canvas.height / 2;
    }
    draw();
}


function parseEquation(eq) {
    let parsed = eq.replace(/sin/g, 'Math.sin')
                   .replace(/cos/g, 'Math.cos')
                   .replace(/tan/g, 'Math.tan')
                   .replace(/sqrt/g, 'Math.sqrt')
                   .replace(/abs/g, 'Math.abs')
                   .replace(/log/g, 'Math.log')
                   .replace(/\^/g, '**'); // Convert x^2 to x**2
    return parsed;
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    
    
    for (let i = offsetX % scale; i < canvas.width; i += scale) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    
    for (let i = offsetY % scale; i < canvas.height; i += scale) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

    
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    

    ctx.beginPath();
    ctx.moveTo(0, offsetY);
    ctx.lineTo(canvas.width, offsetY);
    ctx.stroke();
    
    
    ctx.beginPath();
    ctx.moveTo(offsetX, 0);
    ctx.lineTo(offsetX, canvas.height);
    ctx.stroke();


    const equationString = parseEquation(funcInput.value);
    ctx.strokeStyle = '#3b82f6'; 
    ctx.lineWidth = 2;
    ctx.beginPath();

    let firstPoint = true;


    for (let px = 0; px < canvas.width; px++) {

        let x = (px - offsetX) / scale;
        let y;

        try {

            y = eval(equationString);
            

            let py = offsetY - (y * scale);


            if (py < -10000 || py > 10000) continue;

            if (firstPoint) {
                ctx.moveTo(px, py);
                firstPoint = false;
            } else {
                ctx.lineTo(px, py);
            }
        } catch (e) {

            break;
        }
    }
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX - offsetX;
    dragStartY = e.clientY - offsetY;
    canvas.style.cursor = 'grabbing';
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    canvas.style.cursor = 'grab';
});

window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        offsetX = e.clientX - dragStartX;
        offsetY = e.clientY - dragStartY;
        draw();
    }
});


funcInput.addEventListener('input', draw);
window.addEventListener('resize', resize);

resize();
