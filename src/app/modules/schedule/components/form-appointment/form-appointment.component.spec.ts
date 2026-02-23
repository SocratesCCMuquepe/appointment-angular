import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAppointmentComponent } from './form-appointment.component';

describe('FormAppointmentComponent', () => {
  let component: FormAppointmentComponent;
  let fixture: ComponentFixture<FormAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAppointmentComponent]
    });
    fixture = TestBed.createComponent(FormAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
