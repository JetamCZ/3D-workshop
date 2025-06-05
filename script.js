const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const scale = 10

//                x  y
// const point = [5, 5]

function interpolate(aMin, aMax, bMin, bMax, a) {
    if(aMax - aMin === 0) return bMin

    const t = (a - aMin) / (aMax - aMin)
    return Math.round(((1 - t) * bMin) + (t * bMax))
}

function drawPixel(point, color = '#000000') {
    ctx.fillStyle = color;
    ctx.fillRect(point[0] * scale, point[1] * scale, scale, scale);
}

function drawLine(point1, point2, color) {
    if(point1[0] > point2[0]) {
        let temp = point2
        point2 = point1
        point1 = temp
    }

    const diffX = Math.abs(point1[0] - point2[0])
    const diffY = Math.abs(point1[1] - point2[1])

    if(diffX > diffY) {
        for (let x = point1[0]; x < point2[0]; x += 1) {
            const y = interpolate(point1[0], point2[0], point1[1], point2[1], x)
            drawPixel([x, y], color)
        }
    } else {
        for (let y = point1[1]; y < point2[1]; y += 1) {
            const x = interpolate(point1[1], point2[1], point1[0], point2[0], y)
            drawPixel([x, y], color)
        }
    }
}

drawLine([15, 5], [0, 0], "#ff0000")
drawLine([10, 15], [0, 0], "#00ff00")
drawLine([3, 0], [13, 15],"#0000ff")