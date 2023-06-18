import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: ` <h3>Directive</h3>
    <h5 class="title" highlight>There is a value</h5>
    <h5 highlight="green">Green</h5>
    <p highlight="blue">Paragraph</p>
    <p>Another Paragraph</p>`,
})
class HostComponent {}

fdescribe('HighlightDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, HighlightDirective],
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

  it('should have three highlight elements', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(HighlightDirective)
    );
    const elementsWithout = fixture.debugElement.queryAll(
      By.css('*:not([highlight])')
    );
    expect(elements.length).toEqual(3);
    expect(elementsWithout.length).toEqual(2);
  });

  it('should the elements march with bgColor', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(HighlightDirective)
    );
    expect(elements[0].nativeElement.style.background).toEqual('gray');
    expect(elements[1].nativeElement.style.background).toEqual('green');
    expect(elements[2].nativeElement.style.background).toEqual('blue');
    expect(elements.length).toEqual(3);
  });

  it('should the h5.title be default bgColor', () => {
    const title = fixture.debugElement.query(By.css('.title'));
    const directive = title.injector.get(HighlightDirective);
    expect(title.nativeElement.style.background).toEqual(
      directive.defaultColor
    );
  });
});
