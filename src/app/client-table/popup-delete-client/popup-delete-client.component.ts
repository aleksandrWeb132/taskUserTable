import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Client} from "../interface/client";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-popup-delete-client',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './popup-delete-client.component.html',
  styleUrls: ['./popup-delete-client.component.scss']
})
export class PopupDeleteClientComponent {
  @Input() isVisible = false;
  @Input() data: Client[] | undefined;
  @Output() closeDeleteClient = new EventEmitter();

  onClose(flag: number) {
    let data = this.data;

    if(flag === 0) {
      data = undefined;
    }

    this.closeDeleteClient.emit(data);
  }
}
