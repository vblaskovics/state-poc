export default class Matrix {

  values: number[][];

  get rows(): number {
    return this.values.length;
  }

  get cols(): number {
    return this.values[0].length;
  }

  constructor(values: number[][]) {
    this.values = values;
  }

  isDotProductCompatible(other: Matrix): boolean {
    return this.cols === other.rows;
  }

  dotProduct(other: Matrix): Matrix {
    if (!this.isDotProductCompatible(other)) {
      return this;
    }

    const result = Array.from({ length: this.rows }, () => Array(other.cols).fill(0));

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < other.cols; j++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) {
          sum += this.values[i][k] * other.values[k][j];
        }
        result[i][j] = sum;
      }
    }

    return new Matrix(result);
  }
}


export function createMatrixFromText(textMatrix: string): Matrix {
  if (textMatrix.length < 7) {
    throw new Error('Invalid matrix format');
  }
  if (!textMatrix.includes(';') || !textMatrix.includes(',')) {
    throw new Error('Invalid matrix format');
  }

  const regex = /^[\d,;]+$/; 
  if (!regex.test(textMatrix)) {
    throw new Error('Invalid matrix format');
  }
  
  const values = textMatrix.split(';').map((row) => row.split(',').map(Number));
  
  const isEqualRows = values.every((row) => row.length === values[0].length);
  if(!isEqualRows) {
    throw new Error('Invalid matrix format');
  }
  
  return new Matrix(values);
}