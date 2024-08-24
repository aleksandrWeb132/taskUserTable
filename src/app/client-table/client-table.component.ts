import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";

export interface PeriodicElement {
  checkbox: boolean
  name: string;
  surname: string;
  email: string;
  phone: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: ''},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: ''},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {checkbox: false, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
];

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})

export class ClientTableComponent {
  displayedColumns: string[] = ['checkbox', 'name', 'surname', 'email', 'phone'];
  dataSource = ELEMENT_DATA;
}
