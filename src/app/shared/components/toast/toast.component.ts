import { ToastService } from 'src/app/core/services/toast.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
constructor(public toastService: ToastService) { }
}
