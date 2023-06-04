import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Person } from '../../models/person.model';
import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { By } from '@angular/platform-browser';

fdescribe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleComponent, PersonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of app-person components', () => {
    // arrange
    component.people = [
      new Person('Jhon', 'Connor', 45, 85, 1.78),
      new Person('Douglas', 'Wick', 50, 80, 1.8),
      new Person('Mary', 'Perez', 25, 65, 1.6),
    ];
    // act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));
    // assert
    expect(debugElement.length).toEqual(3);
  });

  it('should raise selected event when clicked', () => {
    // arranfe
    const debugButton = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );
    // act
    debugButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    // assert
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('should render selected person', () => {
    // arranfe
    const debugButton = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );

    // act
    debugButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const liDebug = fixture.debugElement.query(
      By.css('.selected-person ul > li')
    );
    // assert
    expect(component.selectedPerson).toEqual(component.people[0]);
    expect(liDebug.nativeElement.textContent).toContain(
      component.selectedPerson?.name
    );
  });
});
