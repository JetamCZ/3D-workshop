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

const multiplyMatrices = (a, b) => {
    const result = []
    for (let i = 0; i < a.length; i++) {
        result[i] = []
        for (let j = 0; j < b[0].length; j++) {
            let sum = 0
            for (let k = 0; k < b.length; k++) {
                sum += a[i][k] * b[k][j]
            }
            result[i][j] = sum
        }
    }
    return result
}

const scaleMatrix = (scaleX, scaleY) => {
    return [
        [scaleX, 0],
        [0, scaleY],
    ]
}

const rotationMatrixX = (angle) => {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return [
        [1, 0, 0],
        [0, cos, -sin],
        [0, sin, cos]
    ]
}

const rotationMatrixY = (angle) => {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return [
        [cos, 0, sin],
        [0, 1, 0],
        [-sin, 0, cos]
    ]
}

const rotationMatrixZ = (angle) => {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return [
        [cos, -sin, 0],
        [sin, cos, 0],
        [0, 0, 1]
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

const oneMatrix3 = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
]