//import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

fdescribe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    service = new ValueService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests from getValue', () => {
    it('Should return my value', () => {
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('tests from setValue', () => {
    it('Should change the value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('change');
      expect(service.getValue()).toBe('change');
    });
  });

  describe('tests from getPromiseValue', () => {
    it('Should return promise value from promise with then ', (doneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('promise value');
        doneFn();
      });
    });

    it('Should return promise value from promise using async', async () => {
      const rta = await service.getPromiseValue();
      expect(rta).toBe('promise value');
    });
  });

  describe('tests from getObservableValue', () => {
    it('Should return observable value from promise with subscribe ', (doneFn) => {
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('observable value');
        doneFn();
      });
    });
  });
});
