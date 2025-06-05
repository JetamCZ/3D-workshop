const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawPixel(point, color = '#000000') {
    ctx.fillStyle = color;
    ctx.fillRect(point[0] * scale, point[1] * scale, scale, scale);
}

function interpolate(aMin, aMax, bMin, bMax, a) {
    if(aMax - aMin === 0) return bMin

    const t = (a - aMin) / (aMax - aMin)
    return Math.round(((1 - t) * bMin) + (t * bMax))
}

function drawTriangle(points, color) {
    drawLine(points[0], points[1], color)
    drawLine(points[1], points[2], color)
    drawLine(points[2], points[0], color)
}

function drawFillTriangle(pointsAll, color) {
    const points = pointsAll.sort((a, b) => a[1] - b[1]);

    for (let y = points[0][1]; y <= points[2][1]; y++) {
        if(y <= points[1][1]) {
            const x1 = interpolate(points[0][1], points[1][1], points[0][0], points[1][0], y)
            const x2 = interpolate(points[0][1], points[2][1], points[0][0], points[2][0], y)
            drawLine([x1, y], [x2, y], color)
        } else {
            const x1 = interpolate(points[1][1], points[2][1], points[1][0], points[2][0], y)
            const x2 = interpolate(points[0][1], points[2][1], points[0][0], points[2][0], y)
            drawLine([x1, y], [x2, y], color)
        }
    }
}

function drawLine(point1, point2, color) {
    const diffX = Math.abs(point1[0] - point2[0])
    const diffY = Math.abs(point1[1] - point2[1])

    if(diffX > diffY) {
        if(point1[0] > point2[0]) {
            let temp = point2
            point2 = point1
            point1 = temp
        }

        for (let x = point1[0]; x < point2[0]; x += 1) {
            const y = interpolate(point1[0], point2[0], point1[1], point2[1], x)
            drawPixel([x, y], color)
        }
    } else {
        if(point1[1] > point2[1]) {
            let temp = point2
            point2 = point1
            point1 = temp
        }

        for (let y = point1[1]; y < point2[1]; y += 1) {
            const x = interpolate(point1[1], point2[1], point1[0], point2[0], y)
            drawPixel([x, y], color)
        }
    }
}