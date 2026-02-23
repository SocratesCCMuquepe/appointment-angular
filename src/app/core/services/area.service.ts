import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Area } from '../models/area';
import { Observable } from 'rxjs';
import { Professional } from '../models/professional';
import { AppointmentType } from '../models/appointmentType';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:3000/areas';

  getAreas(): Observable<Area[]> {
    let url = `${this.baseUrl}`;
    return this.http.get<Area[]>(url);
  }

  getProfessionalsByArea(area: Area): Observable<Professional[]> {
    let url = `${this.baseUrl}/${area.id}/professionals`;
    return this.http.get<Professional[]>(url);
  }

  getActiveProfessionalsByArea(area: Area): Observable<Professional[]> {
    let url = `${this.baseUrl}/${area.id}/professionals?active=true`;
    return this.http.get<Professional[]>(url);
  }

}
