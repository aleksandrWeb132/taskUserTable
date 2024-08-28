import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {Client} from "./interface/client";
import {MatButtonModule} from "@angular/material/button";
import {PopupUpdateClientComponent} from "./popup-update-client/popup-update-client.component";
import {PopupDeleteClientComponent} from "./popup-delete-client/popup-delete-client.component";
import {PopupAddClientComponent} from "./popup-add-client/popup-add-client.component";
import {ClientsService} from "./clients.service";

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
  imports: [CommonModule, MatTableModule, MatCheckboxModule, FormsModule, MatSortModule, MatButtonModule, PopupUpdateClientComponent, PopupUpdateClientComponent, PopupDeleteClientComponent, PopupAddClientComponent],
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})

export class ClientTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['checkbox', 'name', 'surname', 'email', 'phone'];

  clients: Client[] = []

  dataSource = new MatTableDataSource<Client>(this.clients);
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

  constructor(private clientsService: ClientsService) {}

  ngOnInit() {
    this.loadClients();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadClients() {
    if (this.clients.length === 0) {
      this.clientsService.getClients().subscribe({
        next: (data) => {
          data.users.map((client, index) => {
            this.clients.push({
              id: index,
              name: client.name,
              surname: client.surname,
              email: client.email,
              phone: client.phone
            });
          });
          this.dataSource.data = this.clients;
        },
        error: (error) => {
          console.error('Ошибка при получении клиентов:', error);
        }
      });
    }
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
      this.updateClient(element);
    }

    this.popupUpdateClient.visible = false;
  }
  /** Управление Всплывающим окном добавления клиентов **/
  openPopupAddClient() {
    this.popupAddClient.visible = true;
  }
  closePopupAddClient(element: Client | undefined) {
    if(element !== undefined) {
      this.addClient(element);
    }

    this.popupAddClient.visible = false;
  }
  /** Управление Всплывающим окном удаление клиентов **/
  openPopupDeleteClient() {
    if(!this.isOneSelected()) {
      this.popupDeleteClient.date = this.selection.selected;

      this.popupDeleteClient.visible = true;
    }
  }
  closePopupDeleteClient(element: Client[] | undefined) {
    if(element !== undefined) {
      element.forEach(client => {
        this.deleteClient(client);
      });
    }

    this.popupDeleteClient.visible = false;
  }

  addClient(addClient: Client) {
    addClient.id = this.clients.length;

    this.clients.push(addClient);

    this.dataSource.data = this.clients;
  }

  deleteClient(deleteClient: Client) {
    this.clients = this.clients.filter(client => client.id !== deleteClient.id);

    this.selection.clear();

    this.dataSource.data = this.clients;
  }

  updateClient(updatedClient: Client) {
    const index = this.clients.findIndex(client => client.id === updatedClient.id);

    if(index !== -1) {
      this.clients[index] = updatedClient;

      this.dataSource.data = this.clients;
    }
  }
}
