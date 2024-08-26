import {Component, computed, signal, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {Client} from "./interface/client";

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

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule, FormsModule, MatSortModule],
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})

export class ClientTableComponent {
  displayedColumns: string[] = ['checkbox', 'name', 'surname', 'email', 'phone'];

  dataSource = new MatTableDataSource<Client>(CLIENTS);
  selection  = new SelectionModel<Client>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }
  isOneSelected() {
    return this.selection.selected.length === 0;
  }

  checkSelectionActive(id: number) {
    let check = false;

    this.selection.selected.forEach(element => {
      if(element.id === id) {
        check = true;
      }
    });

    return check;
  }

  toggleAllRows() {
    if(this.isAllSelected()) {
      this.selection.clear();

      return;
    }

    this.selection.select(...this.dataSource.data);
  }
}
