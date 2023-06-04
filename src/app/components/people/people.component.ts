import { Component } from '@angular/core';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent {
  selectedPerson: Person | null = null;

  people: Person[] = [
    new Person('Jhon', 'Connor', 45, 85, 1.78),
    new Person('Douglas', 'Wick', 50, 80, 1.8),
  ];

  choose(person: Person) {
    this.selectedPerson = person;
  }
}
