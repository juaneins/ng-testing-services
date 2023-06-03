import { Person } from './person.model';

describe('Tests for person', () => {
  let person: Person;
  beforeEach(() => {
    person = new Person('Juan', 'Perez', 41, 80, 1.65);
  });

  it('test attrs', () => {
    expect(person.name).toEqual('Juan');
    expect(person.lastName).toEqual('Perez');
    expect(person.age).toEqual(41);
    expect(person.weight).toEqual(80);
    expect(person.height).toEqual(1.65);
  });

  describe('Test for calcIMC', () => {
    it('should return a string down', () => {
      // arrange
      person.weight = 40;
      person.age = 1.65;
      // act
      const rta = person.calcIMC();
      // assert
      expect(rta).toEqual('down');
    });
    it('should return a string normal', () => {
      // arrange
      person.weight = 58;
      person.age = 1.65;
      // act
      const rta = person.calcIMC();
      // assert
      expect(rta).toEqual('normal');
    });
  });
});
