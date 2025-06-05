const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const scale = 10

//                x  y
// const point = [5, 5]

function drawPixel(point, color = '#000000') {
    ctx.fillStyle = color;
    ctx.fillRect(point[0] * scale, point[1] * scale, scale, scale);
}


drawPixel([0, 0], "#ff00ff")

function drawLine(point1, point2, color) {
    if(point1[0] > point2[0]) {
        let temp = point2
        point2 = point1
        point1 = temp
    }

    for (let x = point1[0]; x < point2[0]; x += 1) {
        const y = point1[1]

        drawPixel([x, y], color)
    }
}

drawLine([10, 0], [0, 0], "#ff0000")


function interpolate(aMin, aMax, bMin, bMax, a) {
    if(aMax - aMin === 0) return bMin

    const t = (a - aMin) / (aMax - aMin)
    return Math.round(((1 - t) * bMin) + (t * bMax))
}
