import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatSortModule} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {Client} from "./interface/client";
import {MatButtonModule} from "@angular/material/button";
import {PopupUpdateClientComponent} from "./popup-update-client/popup-update-client.component";

const CLIENTS: Client[] = [
  {id: 0, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {id: 1, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {id: 2, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: ''},
  {id: 3, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {id: 4, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {id: 5, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {id: 6, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {id: 7, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {id: 8, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {id: 9, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {id: 10, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {id: 11, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {id: 12, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: ''},
  {id: 13, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {id: 14, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {id: 15, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {id: 16, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {id: 17, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'},
  {id: 18, name: 'Александр', surname: "Прилучный", email: 'iohl_990@mail.ru', phone: '+79053856195'}
]

export interface isVisible {
  visible: boolean
}

export interface popupUpdate extends isVisible {
  date: Client | undefined
}

export interface popupAdd extends isVisible {
  date: Client | undefined
}

export interface popupDelete extends isVisible {
  date: Client[] | undefined
}

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule, FormsModule, MatSortModule, MatButtonModule, PopupUpdateClientComponent, PopupUpdateClientComponent],
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})

export class ClientTableComponent {
  displayedColumns: string[] = ['checkbox', 'name', 'surname', 'email', 'phone'];

  dataSource = new MatTableDataSource<Client>(CLIENTS);
  selection  = new SelectionModel<Client>(true, []);

  popupUpdateClient: popupUpdate = {
    date: undefined,
    visible: false
  }
  popupAddClient: popupAdd       = {
    date: undefined,
    visible: false
  }
  popupDeleteClient: popupDelete = {
    date: undefined,
    visible: false
  }

  /** Проверяет все ли клиенту выбраны **/
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }
  /** Проверяет есть ли хотябы 1 клиент выбраный **/
  isOneSelected() {
    return this.selection.selected.length === 0;
  }
  /** Добавляет выбраных клиентов в отдельный массив или удаляет из этого массива всех **/
  toggleAllRows() {
    if(this.isAllSelected()) {
      this.selection.clear();

      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  /** Проверяет есть ли у клиента активный checkbox **/
  checkSelectionActive(id: number) {
    let check = false;

    this.selection.selected.forEach(element => {
      if(element.id === id) {
        check = true;
      }
    });

    return check;
  }

  /** Управление Всплывающим окном обновления клиентов **/
  openPopupUpdateClient(element: Client) {
    this.popupUpdateClient.date = element;

    this.popupUpdateClient.visible = true;
  }
  closePopupUpdateClient(element: Client | undefined) {
    if(element !== undefined) {
      console.log(element);
    }

    this.popupUpdateClient.visible = false;
  }
  /** Управление Всплывающим окном добавления клиентов **/
  openPopupAddClient() {
    this.popupAddClient.visible = true;
  }
  closePopupAddClient(element: Client | undefined) {
    if(element !== undefined) {
      console.log(element);
    }

    this.popupAddClient.visible = false;
  }
  /** Управление Всплывающим окном удаление клиентов **/
  openPopupDeleteClient() {
    if(this.isOneSelected()) {
      this.popupDeleteClient.date = this.selection.selected;

      this.popupDeleteClient.visible = true;
    }
  }
  closePopupDeleteClient(element: Client[] | undefined) {
    if(element !== undefined) {
      console.log(element);
    }

    this.popupDeleteClient.visible = false;
  }
}
