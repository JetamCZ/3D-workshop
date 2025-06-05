const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const scale = 5

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

//drawLine([20, 20], [15, 5], "#ff0000")
//drawLine([10, 15], [0, 0], "#00ff00")
//drawLine([3, 0], [13, 15],"#0000ff")

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

function drawTriangle(points, color) {
    drawLine(points[0], points[1], color)
    drawLine(points[1], points[2], color)
    drawLine(points[2], points[0], color)
}


drawTriangle([
    [20, 20, 20],
    [20, 40, 20],
    [40, 20, 20],
], "#ff0000")

drawTriangle([
    [40, 40, 20],
    [20, 40, 20],
    [40, 20, 20],
], "#aaaa00")


const cubeVertices = [
    [-20, -20, -20],
    [20, -20, -20],
    [20, 20, -20],
    [-20, 20, -20],
    [-20, -20, 20],
    [20, -20, 20],
    [20, 20, 20],
    [-20, 20, 20]
]

const cubeEdges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7]
]

function drawCube(vertices, edges, rotationX = 0, rotationY = 0, rotationZ = 0, color = "#ffffff") {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const rotX = rotationMatrixX(rotationX)
    const rotY = rotationMatrixY(rotationY)
    const rotZ = rotationMatrixZ(rotationZ)
    
    const combinedRotation = multiplyMatrices(multiplyMatrices(rotX, rotY), rotZ)
    
    const transformedVertices = vertices.map(vertex => {
        const rotated = multMat3(vertex, combinedRotation)
        const projected = project3Dto2D(rotated)
        return [
            Math.round(projected[0] + canvas.width / 2),
            Math.round(projected[1] + canvas.height / 2)
        ]
    })
    
    edges.forEach(edge => {
        const [start, end] = edge
        const point1 = [
            Math.floor(transformedVertices[start][0] / scale),
            Math.floor(transformedVertices[start][1] / scale)
        ]
        const point2 = [
            Math.floor(transformedVertices[end][0] / scale),
            Math.floor(transformedVertices[end][1] / scale)
        ]
        drawLine(point1, point2, color)
    })
}

/*
let angle = 0
function animate() {
    angle += 0.02
    drawCube(cubeVertices, cubeEdges, angle, angle * 0.7, angle * 0.3, "#00ff00")
    requestAnimationFrame(animate)
}

animate()

 */