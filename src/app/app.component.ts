import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientHeaderComponent} from "./client-header/client-header.component";
import {ClientTableComponent} from "./client-table/client-table.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ClientHeaderComponent, ClientTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'taskUserTable';
}
