import { Component } from '@angular/core';
import { Client } from 'src/app/core/models/client';
import { ClientService } from 'src/app/core/services/client.service';
import { Page } from 'src/app/core/services/page';

@Component({
  selector: 'app-clients-table-page',
  templateUrl: './clients-table-page.component.html',
  styleUrls: ['./clients-table-page.component.css']
})
export class ClientsTablePageComponent {
  constructor(private clientService: ClientService) { }
  clientPage: Page<Client> = {} as Page<Client>;
  page: number = 1;
  nameFillter: string = '';
  ngOnInit(): void {
    this.loadClients();
  }

  pageChange() {
    this.loadClients();
  }
  loadClients() {
    this.clientService.getClients(this.nameFillter, this.page).subscribe({
      next: response => {
        this.clientPage.content = response.body;
        this.clientPage.numberOfElements = parseInt(response.headers.get('X-Total-Count') || '0');
      }
    });
  }
  searchClient() {
    this.loadClients();
  }
  deleteClient(id: number) {
    this.clientService.deleteClient(id).subscribe({
      next: () => this.loadClients(),
      error: err => alert('Erro ao deletar cliente')
    });
  }
}
