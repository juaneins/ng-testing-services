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

describe('Test for calculator', () => {
  it('#multiply should return zero', () => {
    // arrange
    const calculator = new Calculator();
    // act
    const rta = calculator.multiply(0, 14);
    //assert
    expect(rta).toEqual(0);
  });
});

describe('Test for calculator', () => {
  it('#divide should return some numbers', () => {
    // arrange
    const calculator = new Calculator();
    expect(calculator.divide(12, 2)).toEqual(6);
    expect(calculator.divide(12, 0)).toEqual(0);
    expect(calculator.divide(5, 1)).toEqual(5);
  });
});

describe('Test for calculator', () => {
  it('#test matchers', () => {
    let name = 'juan';
    let name2;
    expect(name).toBeDefined();
    expect(name2).toBeUndefined();

    expect(1 + 3 === 4).toBeTruthy();
    expect(1 + 3 === 2).toBeFalsy();
    expect(6 + 3 === 8).toBeFalsy();

    expect(6).toBeLessThan(12);
    expect(20).toBeGreaterThan(16);

    expect('123456').toMatch(/123/);
    expect(['apples', 'oranges', 'pears']).toContain('oranges');
  });
});
