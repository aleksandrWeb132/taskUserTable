import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {Client} from "../interface/client";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";

@Component({
  selector: 'app-popup-update-client',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './popup-update-client.component.html',
  styleUrls: ['./popup-update-client.component.scss']
})

export class PopupUpdateClientComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() data: Client | undefined;
  @Output() closeUpdateClient = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['']
    });

    this.form.get('name')?.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(value => {
      if(value.length <= 2) {
        this.form.get('name')?.setErrors({ required: true });
      }
    });
    this.form.get('surname')?.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(value => {
      if(value.length <= 2) {
        this.form.get('surname')?.setErrors({ required: true });
      }
    });
    this.form.get('email')?.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(value => {
      if(!this.checkEmail(value)) {
        this.form.get('email')?.setErrors({ required: true });
      }
    });
    this.form.get('phone')?.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(value => {
      if(value !== '') {
        if(!this.checkPhone(value)) {
          this.form.get('phone')?.setErrors({ required: true });
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['data']) {
      if(!changes['data']['firstChange']) {
        this.form.patchValue({
          name: changes['data']['currentValue'].name,
          surname: changes['data']['currentValue'].surname,
          email: changes['data']['currentValue'].email,
          phone: changes['data']['currentValue'].phone
        });
      }
    }
  }

  get name() {
    return this.form.get('name');
  }
  get surname() {
    return this.form.get('surname');
  }
  get email() {
    return this.form.get('email');
  }
  get phone() {
    return this.form.get('phone');
  }

  checkEmail(value: string) {
    const emailRegexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    return emailRegexp.test(value);
  }
  checkPhone(value: string) {
    const phoneRegexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/iu;

    return phoneRegexp.test(value);
  }

  checkUpdateForm() {
    return this.form.status !== 'VALID';
  }

  onClose(flag: number) {
    let data = this.data;

    if(flag === 0) {
      data = undefined;
    }

    this.closeUpdateClient.emit(data);
  }
}
