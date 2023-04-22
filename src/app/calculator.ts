export class Calculator {
  constructor() {}

  multiply(a: number, b: number) {
    return a * b;
  }

  divide(a: number, b: number) {
    if (b === 0) {
      return 0;
    }
    return a / b;
  }
}
