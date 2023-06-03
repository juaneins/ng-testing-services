import { Component } from '@angular/core';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent {
  person: Person = new Person('Jhon', 'Connor', 45, 85, 1.78);
}
