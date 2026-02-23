import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, OperatorFunction } from 'rxjs';
import { AppointmentType } from 'src/app/core/models/appointmentType';
import { Area } from 'src/app/core/models/area';
import { Client } from 'src/app/core/models/client';
import { Professional } from 'src/app/core/models/professional';

@Component({
  selector: 'app-form-appointment',
  templateUrl: './form-appointment.component.html',
  styleUrls: ['./form-appointment.component.css']
})
export class FormAppointmentComponent {
  @Input()
  areas: Area[] = [];

  @Input()
  professionals: Professional[] = [];

  @Input()
  appointmentTypes: AppointmentType[] = [];

  @Output()
  selectedAreaEvent = new EventEmitter<Area>();

  @Input()
  searchClients !: OperatorFunction<string, readonly Client[]>;

  submitted: boolean = false;

  appointmentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.appointmentForm = this.formBuilder.group({
      area: ['', Validators.required],
      professional: [{value: '', disabled: true}, Validators.required],
      appointmentType: ['', Validators.required],
      client: ['', Validators.required],
      comment: ['']
    });
  }

  formatter = (client: Client) => client.name;

  getSelectedClient() {
    return this.appointmentForm.get('client')?.value;
  }

  onAreaChange() {
      this.selectedAreaEvent.emit(this.appointmentForm.value['area']);
      this.appointmentForm.get('professional')?.enable();
  }

}
