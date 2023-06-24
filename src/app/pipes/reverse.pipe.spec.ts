import { ReversePipe } from './reverse.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform roma to amor', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('roma');
    expect(rta).toEqual('amor');
  });

  it('should transform 123 to 321', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('123');
    expect(rta).toEqual('321');
  });
});

@Component({
  template: `
    <h5>{{ 'amor' | reverse }}</h5>
    <input type="text" [(ngModel)]="text" />
    <p>{{ text | reverse }}</p>
  `,
})
class HostComponent {
  text = '';
}

describe('ReversePipe from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, ReversePipe],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be h5 be roma', () => {
    const h5Debug = fixture.debugElement.query(By.css('h5'));
    expect(h5Debug.nativeElement.textContent).toEqual('roma');
  });

  it('should apply reverse pipe when typing in the input', () => {
    const inputDebug = fixture.debugElement.query(By.css('input'));
    const inputNativeElement: HTMLInputElement = inputDebug.nativeElement;
    const pDebug = fixture.debugElement.query(By.css('p'));

    expect(pDebug.nativeElement.textContent).toEqual('');
    inputNativeElement.value = 'bear';
    inputNativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(pDebug.nativeElement.textContent).toEqual('raeb');
  });
});
