import { Calculator } from './calculator';

describe('Test for calculator', () => {
  it('#multiply should return a twelve', () => {
    // arrange
    const calculator = new Calculator();
    // act
    const rta = calculator.multiply(3, 4);
    //assert
    expect(rta).toEqual(12);
  });
});
