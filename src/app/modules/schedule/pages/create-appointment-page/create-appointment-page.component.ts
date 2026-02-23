import { AppointmentType } from './../../../../core/models/appointmentType';
import { Component, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, Observable, switchMap } from 'rxjs';
import { Area } from 'src/app/core/models/area';
import { Client } from 'src/app/core/models/client';
import { Professional } from 'src/app/core/models/professional';
import { AppointmentTypeService } from 'src/app/core/services/appointment-type.service';
import { AreaService } from 'src/app/core/services/area.service';
import { ClientService } from 'src/app/core/services/client.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { FormAppointmentComponent } from '../../components/form-appointment/form-appointment.component';

@Component({
  selector: 'app-create-appointment-page',
  templateUrl: './create-appointment-page.component.html',
  styleUrls: ['./create-appointment-page.component.css']
})
export class CreateAppointmentPageComponent {

  areas: Area[] = [];

  professionalsById: Professional[] = [];

  appointmentTypes: AppointmentType[] = [];

  @ViewChild(FormAppointmentComponent)
  formAppointmentComponent!: FormAppointmentComponent;

  constructor(private areaService: AreaService,
    private appointmentTypeService: AppointmentTypeService,
    private clientService: ClientService) { }

  ngOnInit() {
    this.loadAreas();
    this.loadAppointmentTypes();
  }

  loadAreas() {
    this.areaService.getAreas().subscribe(
      (data) => {
        this.areas = data;
      }
    );
  }

  searchClients = (text: Observable<string>): Observable<Client[]> => {
    return text.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term.length >= 2),
      switchMap(term => this.clientService.getClientsWithNameContaining(term))
    );
  }

  loadAppointmentTypes() {
    this.appointmentTypeService.getAppointmentType().subscribe(
      (data) => {
        this.appointmentTypes = data;
      }
    );
  }

  onSelectedArea(area: Area) {
    this.areaService.getActiveProfessionalsByArea(area).subscribe(
      (data) => {
        this.professionalsById = data;
      },
      (error) => {
        alert('Erro ao carregar profissionais');
      }
    );
  }

  createAppointment() {
    this.formAppointmentComponent.submitted = true;
    if (this.formAppointmentComponent.appointmentForm.valid) {
      alert(JSON.stringify(this.formAppointmentComponent.appointmentForm.value));
    }
  }

  openModal(modalConfirm: ModalComponent) {
    modalConfirm.open().then(result => {
      if (result) {
        alert('Agendamento confirmado!');
      } else {
        alert('Erro ao confirmar agendamento');
      }
    });
  }


}
