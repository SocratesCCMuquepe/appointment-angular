import { Injectable } from '@angular/core';
import { AppointmentType } from '../models/appointmentType';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentTypeService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:3000/appointment-types';

  getAppointmentType(): Observable<AppointmentType[]> {
    let url = `${this.baseUrl}`;
    return this.http.get<AppointmentType[]>(url);
  }
}
