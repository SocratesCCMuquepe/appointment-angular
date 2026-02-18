import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input()
  title !: string;

  @ViewChild('modalGenerico')
  modalContent !: TemplateRef<ModalComponent>;

  constructor(private modalService: NgbModal) {}

	open() {
		return this.modalService.open(this.modalContent, {}).result;
	}

}
