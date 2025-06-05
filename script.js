const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const scale = 10

function drawPixel(point, color = '#000000') {
    ctx.fillStyle = color;
    ctx.fillRect(point.x * scale, point.y * scale, scale, scale);
}


drawPixel({x: 5, y: 5}, "#ff0000")