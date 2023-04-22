//import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  it('should return "my Value" from the real service', () => {
    const valueService = new ValueService();
    const masterService = new MasterService(valueService);
    expect(masterService.getValue()).toBe('my value');
  });

  it('should return "other value" from the fake service', () => {
    const fake = { getValue: () => 'fake from obj' };
    const masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake from obj');
  });

  it('should call getValue from the ValueService', () => {
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    valueServiceSpy.getValue.and.returnValue('fake value');
    const masterService = new MasterService(valueServiceSpy);
    expect(masterService.getValue()).toBe('fake value');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});