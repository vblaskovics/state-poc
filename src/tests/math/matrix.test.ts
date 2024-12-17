import { describe, expect, it } from 'vitest';
import Matrix, { createMatrixFromText } from '../../math/matrix';

describe('Matrix', () => {
  it('should return the number of rows in the matrix', () => {
    const matrix = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
    ]);

    expect(matrix.rows).toBe(2);
  });

  it('should return the number of columns in the matrix', () => {
    const matrix = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
    ]);

    expect(matrix.cols).toBe(3);
  });

  it('should return false if another Matrix is not compatible for dot product', () => {
    const matrix1 = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    const matrix2 = new Matrix([
      [1, 2],
      [3, 4],
    ]);
    expect(matrix1.isDotProductCompatible(matrix2)).toBeFalsy();
  });

  it('should do nothing for incompatible matrices', () => {
    const matrix1 = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    const matrix2 = new Matrix([
      [1, 2],
      [3, 4],
    ]);

    expect(matrix1.dotProduct(matrix2)).toEqual(matrix1);
  });

  it('should provide dot product method', () => {
    const matrix1 = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    const matrix2 = new Matrix([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);

    const result = [
      [22, 28],
      [49, 64],
    ];

    expect(matrix1.dotProduct(matrix2).values).toEqual(result);
  });
});

describe('createMatrixFromText', () => {
  it('should create a matrix from text', () => {
    expect(createMatrixFromText('1,2;3,4') instanceof Matrix).toBeTruthy();
    expect(createMatrixFromText('1,2;3,4').values).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(createMatrixFromText('1,2,3;4,5,6').values).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    expect(createMatrixFromText('1,2,3;4,5,6;7,8,9').values).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });

  it('should throw an error if get invalid input for create matrix from text', () => {
    // empty string
    expect(() => createMatrixFromText('')).toThrowError('Invalid matrix format');

    // missing semicolon
    expect(() => createMatrixFromText('1,2,3 4,5,6')).toThrowError('Invalid matrix format');

    // missing comma
    expect(() => createMatrixFromText('1;2;3;4')).toThrowError('Invalid matrix format');

    // inconsistent col lengths
    expect(() => createMatrixFromText('1,2,3;4,5')).toThrowError('Invalid matrix format');

    // non-numeric values
    expect(() => createMatrixFromText('1,2;a,b')).toThrowError('Invalid matrix format');
  });
});
