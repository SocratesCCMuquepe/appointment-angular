import { Component } from '@angular/core';
import { Client } from 'src/app/core/models/client';
import { ClientService } from 'src/app/core/services/client.service';
import { Page } from 'src/app/core/services/page';
import { ToastService } from 'src/app/core/services/toast.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-clients-table-page',
  templateUrl: './clients-table-page.component.html',
  styleUrls: ['./clients-table-page.component.css']
})
export class ClientsTablePageComponent {
  constructor(private clientService: ClientService, private toastService: ToastService) { }
  clientPage: Page<Client> = {} as Page<Client>;
  page: number = 1;
  nameFillter: string = '';

  // Selecionar cliente para deletar
  clientSelected !: Client;

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
  deleteClient(id: number, modalConfirm: ModalComponent) {

    this.clientSelected = this.clientPage.content?.find(client => client.id === id) as Client;

    modalConfirm.open().then(result => {
      if (result) {
        this.clientService.deleteClient(id).subscribe({
          next: () => {
            this.toastService.show('Cliente deletado com sucesso!', { classname: 'bg-success text-light', delay: 5000 });
            this.loadClients();
          },
          error: err => this.toastService.show('Erro ao deletar cliente', { classname: 'bg-danger text-light', delay: 5000 })
        });
      }
    })
  }
}
