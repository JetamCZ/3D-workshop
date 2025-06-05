const triangle1 = [
    [20, 20, 20],
    [20, 40, 20],
    [40, 20, 20],
]

const triangle2 = [
    [40, 40, 20],
    [20, 40, 20],
    [40, 20, 20],
]

const triangle3 = [
    [40, 40, 20],
    [20, 40, 20],
    [40, 40, 40],
]

const triangle4 = [
    [40, 40, 40],
    [20, 40, 20],
    [20, 40, 40],
]

drawTriangle(triangle1, "#ff0000")
drawTriangle(triangle2, "#aaaa00")
drawTriangle(triangle3, "#aaaaaa")
drawTriangle(triangle4, "#0aa00a")

const scene = [
    triangle1, triangle2, triangle3, triangle4
]

const sceneScreen = scene.map(primitive =>
    primitive
        .map(getHomogeneousPoint)
        //.map(p => multMat4(p, moveMatrix(3, 3)))
        .map(p => multMat4(p, scaleMatrix(3, 3, 3)))
        .map(p => multMat4(p, rotationMatrixY(35)))
        .map(p => project3Dto2D(p))
        .map(p => mapToScreen(p, scale))
)

sceneScreen.forEach(primitive => drawTriangle(primitive, "#ff0000"))