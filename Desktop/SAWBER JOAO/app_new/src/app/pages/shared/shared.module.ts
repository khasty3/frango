import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalClinicasComponent } from './modal-clinicas/modal-clinicas.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalMotoboyPageModule } from './modal-motoboy/modal-motoboy.module';
import { ModalMedicosPageModule } from './modal-medicos/modal-medicos.module';
import { MedicoFormPageModule } from '../medico-form/medico-form.module';
import { ModalConfirmeNotificationComponent } from './modal-confirme-notification/modal-confirme-notification.component';
import { ModalSignatureComponent } from './modal-signature/modal-signature.component';



@NgModule({
  declarations: [
    ModalClinicasComponent,
    ModalConfirmeNotificationComponent,
    ModalSignatureComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMotoboyPageModule,
    ModalMedicosPageModule,
    MedicoFormPageModule,
  ],
  exports: [
    ModalSignatureComponent
  ]
})
export class SharedModule { }
