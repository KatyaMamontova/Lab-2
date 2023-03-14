class MatrixOperations {
    constructor(){}
    
    round = num => Math.round(num * 100) / 100;
    
    createZeroMatrix(size) {
      return new Array(size).fill(0).map(row => new Array(size).fill(0));
    }

    transposeMatrix(matrix) {
      return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
    }
    
    multiplyMatrices(A, B) {
      let result = new Array(A.length).fill(0).map(row => new Array(B[0].length).fill(0));
      return result.map((row, i) => {
        return row.map((val, j) => {
          return A[i].reduce((sum, elem, k) => /*this.round*/(sum + (elem * B[k][j])), 0)
        })
      })
    }
    
    multiplyMatrixByVector(A, b) {
      let result = new Array(b.length).fill(0);
      return result.map((row, i) => {
        return A[i].reduce((sum, elem, k) => {
          return /*this.round*/(sum + (elem * b[k]))
        }, 0)
      })
    }
}