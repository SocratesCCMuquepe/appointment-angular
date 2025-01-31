import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:3000/clients';

  getClients(clientNameFillter: string, page: number): Observable<HttpResponse<Client[]>> {
    let url = `${this.baseUrl}?name_like=${clientNameFillter}&_page=${page}&_limit=10&_sort=name`;
    return this.http.get<Client[]>(url, { observe: 'response' });
  }

  deleteClient(id: number): Observable<Client> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.delete<Client>(url);
  }

  saveClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client);
  }

  updateClient(client: Client): Observable<Client> {
    let url = `${this.baseUrl}/${client.id}`;
    return this.http.put<Client>(url, client);
  }

  getClientById(id: number): Observable<Client> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Client>(url);
  }

}
