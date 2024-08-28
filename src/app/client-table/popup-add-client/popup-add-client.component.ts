import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {debounceTime, distinctUntilChanged} from "rxjs";

@Component({
  selector: 'app-popup-add-client',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './popup-add-client.component.html',
  styleUrls: ['./popup-add-client.component.scss']
})
export class PopupAddClientComponent {
  @Input() isVisible = false;
  @Output() closeAddClient = new EventEmitter();

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

    this.closeAddClient.emit(undefined);
  }
}
