const multMat2 = (point, matrix) => {
    return [
        point[0] * matrix[0][0] + point[0] * matrix[0][1],
        point[1] * matrix[1][0] + point[1] * matrix[1][1],
    ]
}

const multMat3 = (point, matrix) => {
    return [
        point[0] * matrix[0][0] + point[1] * matrix[0][1] + point[2] * matrix[0][2],
        point[0] * matrix[1][0] + point[1] * matrix[1][1] + point[2] * matrix[1][2],
        point[0] * matrix[2][0] + point[1] * matrix[2][1] + point[2] * matrix[2][2],
    ]
}

const multMat4 = (point, matrix) => {
    return [
        point[0] * matrix[0][0]
        + point[1] * matrix[0][1]
        + point[2] * matrix[0][2]
        + point[3] * matrix[0][3],

        point[0] * matrix[1][0]
        + point[1] * matrix[1][1]
        + point[2] * matrix[1][2]
        + point[3] * matrix[1][3],

        point[0] * matrix[2][0]
        + point[1] * matrix[2][1]
        + point[2] * matrix[2][2]
        + point[3] * matrix[2][3],

        point[0] * matrix[3][0]
        + point[1] * matrix[3][1]
        + point[2] * matrix[3][2]
        + point[3] * matrix[3][3],
    ]
}

const getHomogeneousPoint = (point) => {
    return [point[0], point[1], point[2], 1]
}

const scaleMatrix = (scaleX = 1, scaleY = 1, scaleZ = 1) => {
    return [
        [scaleX, 0, 0, 0],
        [0, scaleY, 0, 0],
        [0, 0, scaleZ, 0],
        [0, 0, 0, 1],
    ]
}

const rotationMatrixX = (angle) => {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return [
        [1, 0, 0, 0],
        [0, cos, -sin, 0],
        [0, sin, cos, 0],
        [0, 0, 0, 1]
    ]
}

const rotationMatrixY = (angle) => {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return [
        [cos, 0, sin, 0],
        [0, 1, 0, 0],
        [-sin, 0, cos, 0],
        [0, 0, 0, 1]
    ]
}

const rotationMatrixZ = (angle) => {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return [
        [cos, -sin, 0, 0],
        [sin, cos, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]
}

const project3Dto2D = (point3D, distance = 200) => {
    const z = point3D[2] + distance
    if (z === 0) return [point3D[0], point3D[1]]
    
    return [
        (point3D[0] * distance) / z,
        (point3D[1] * distance) / z
    ]
}

const mapToScreen = (point, scale) => {
    return [
        Math.floor(Math.round(point[0] + canvas.width / 2) / scale),
        Math.floor( Math.round(point[1] + canvas.height / 2) / scale)
    ]
}

const oneMatrix = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
]

const moveMatrix = (x, y, z = 0) => {
    return [
        [1, 0, 0, x],
        [0, 1, 0, y],
        [0, 0, 1, z],
        [0, 0, 0, 1],
    ]
}