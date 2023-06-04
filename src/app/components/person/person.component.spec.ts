import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from '../../models/person.model';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have name "Juan"', () => {
    component.person = new Person('Juan', 'Perez', 41, 80, 1.65);
    expect(component.person.name).toEqual('Juan');
  });

  it('should have <p> with text my height is ${component.person.height}', () => {
    // use debugElement by agnostic
    // arrange
    component.person = new Person('Mario', 'Perez', 33, 80, 1.65);
    const expectMsg = `my height is ${component.person.height}`;
    const personDebug: DebugElement = fixture.debugElement;
    const personElement: HTMLElement = personDebug.nativeElement;
    const p = personElement.querySelector('p');
    // act
    fixture.detectChanges();
    // assert
    expect(p?.textContent).toEqual(expectMsg);
  });
  it('should have <p> with text my height is {{ person.height }} css selector', () => {
    // use debugElement by agnostic
    component.person = new Person('Mario', 'Perez', 33, 80, 1.65);
    const expectMsg = `my height is ${component.person.height}`;
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;
    fixture.detectChanges();
    expect(pElement?.textContent).toEqual(expectMsg);
  });
  it('should have <h3> with text Hello, {{person.name}}', () => {
    // use debugElement by agnostic
    // arrange
    component.person = new Person('Mario', 'Perez', 33, 80, 1.65);
    const expectMsg = `Hello, ${component.person.name}`;
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;
    // act
    fixture.detectChanges();
    // assert
    expect(h3Element?.textContent).toEqual(expectMsg);
  });

  it('Should display text with IMC when execute calcIMC method', () => {
    // arrange
    const expectedMsg = 'overweight';
    component.person = new Person('Harry', 'Potter', 23, 75, 1.73);
    const button: HTMLElement = fixture.debugElement.query(
      By.css('button.btn-imc')
    ).nativeElement;

    // act
    component.calcIMC();
    fixture.detectChanges();
    // assert
    expect(button.textContent).toContain(expectedMsg);
  });

  it('Should display text with IMC when click button', () => {
    // arrange
    const expectedMsg = 'overweight';
    component.person = new Person('Harry', 'Potter', 23, 75, 1.73);
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonElement = buttonDebug.nativeElement;
    // act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // assert
    expect(buttonElement.textContent).toContain(expectedMsg);
  });

  it('should raise selected event when click button', () => {
    // arrange
    component.person = new Person('Harry', 'Potter', 23, 75, 1.73);
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-choose'));
    let selectedPerson: Person | undefined;
    component.onSelected.subscribe((person) => {
      selectedPerson = person;
    });
    // act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // assert
    expect(selectedPerson).toEqual(component.person);
  });
});

@Component({
  template: `<app-person
    [person]="person"
    (onSelected)="onSelected($event)"
  ></app-person>`,
})
class HostComponent {
  person = new Person('John', 'Wick', 46, 78, 1.9);
  selectedPerson: Person | undefined;

  constructor() {}

  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, PersonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    // arrange
    const expectedName = component.person.name;
    const h3Debug = fixture.debugElement.query(By.css('app-person h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;
    // act
    fixture.detectChanges();
    // asert
    expect(h3Element.textContent).toContain(expectedName);
  });

  it('should raise selected event when clicked', () => {
    // arrange
    const expectedName = component.person.name;
    const btnDebug = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );
    //const btnElement: HTMLElement = btnDebug.nativeElement;
    // act
    btnDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // asert
    expect(component.selectedPerson).toEqual(component.person);
  });
});
