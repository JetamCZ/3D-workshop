const multMat2 = (point, matrix) => {
    return [
        point[0] * matrix[0][0] + point[0] * matrix[0][1],
        point[1] * matrix[1][0] + point[1] * matrix[1][1],
    ]
}


const scaleMatrix = (scaleX, scaleY) => {
    return [
        [scaleX, 0],
        [0, scaleY],
    ]
}

