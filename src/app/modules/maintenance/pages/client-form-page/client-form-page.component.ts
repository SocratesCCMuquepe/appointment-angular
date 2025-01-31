import { ClientService } from 'src/app/core/services/client.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/core/models/client';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-form-page',
  templateUrl: './client-form-page.component.html',
  styleUrls: ['./client-form-page.component.css']
})
export class ClientFormPageComponent {

  formGroupClient: FormGroup;
  client: Client = {} as Client;
  isEditing = false;

  constructor(private clientService: ClientService, private formBuilder: FormBuilder, private location: Location, private activatedRoute: ActivatedRoute) {
    this.formGroupClient = this.formBuilder.group({
      id: {disabled: true },
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      dateOfbirth: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      let id = Number(params.get('id') ?? '0');

      if (id) {
        this.loadClient(id);
        this.isEditing = true;
      }

    });
  }

  saveClient() {
    if (this.isEditing) {

      this.clientService.updateClient(this.formGroupClient.value).subscribe({
        next: () => {
          this.location.back();
        },
        error: () => alert('Erro ao atualizar cliente')
      });

    } else {

      this.clientService.saveClient(this.formGroupClient.value).subscribe({
        next: () => {
          this.location.back();
        },
        error: () => alert('Erro ao salvar cliente')
      });

    }
  }


  loadClient(id: number) {
    this.clientService.getClientById(id).subscribe({
      next: (clientResponse) => {
        this.client = clientResponse;
        this.formGroupClient.patchValue(this.client);
      },
      error: () => alert('Erro ao carregar cliente')
    });
  }

  cancelForm() {
    this.location.back();
  }

  get pfgname() { return this.formGroupClient.get('name'); }
  get pfphone() { return this.formGroupClient.get('phone'); }
  get pfdateOfbirth() { return this.formGroupClient.get('dateOfbirth'); }

}
