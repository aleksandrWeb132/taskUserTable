import {Component, computed, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";

export interface ClientElement {
  completed: boolean
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export interface TableControl {
  completed: boolean;
  columns: string[];
  clients: ClientElement[];
}

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule, FormsModule],
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})

export class ClientTableComponent {
  readonly tableClient = signal<TableControl>({
    completed: false,
    columns: ['checkbox', 'name', 'surname', 'email', 'phone'],
    clients: [
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: ''},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: ''},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
      {completed: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'}
    ]
  });

  readonly partiallyComplete = computed(() => {
    const task = this.tableClient();
    if (!task.clients) {
      return false;
    }
    return task.clients.some(t => t.completed) && !task.clients.every(t => t.completed);
  });

  update(completed: boolean, index?: number) {
    this.tableClient.update(task => {
      if (index === undefined) {
        task.completed = completed;
        task.clients?.forEach(t => (t.completed = completed));
      } else {
        task.clients![index].completed = completed;
        task.completed = task.clients?.every(t => t.completed) ?? true;
      }
      return {...task};
    });
  }

  checkLengthClient() {
    return this.tableClient().clients.length < 1;
  }
}
