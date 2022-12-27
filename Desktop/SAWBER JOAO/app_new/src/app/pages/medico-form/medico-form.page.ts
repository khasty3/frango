import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MedicoService } from 'src/app/services/medico.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-medico-form',
  templateUrl: './medico-form.page.html',
  styleUrls: ['./medico-form.page.scss'],
})
export class MedicoFormPage implements OnInit {

  dados: any = {};

  constructor(
    private modalCtrl: ModalController,
    private service: MedicoService,
    private message: MessageService
  ) { }

  ngOnInit() {
  }

  close(params = undefined) {
    this.modalCtrl.dismiss(params);
  }

  submit(form: NgForm) {
    if (!form.valid) {
      return this.message.toastError('Todos os campos são obrigatórios.');
    }
    console.log(this.dados);
    this.create();
  }

  create() {
    this.message.load_present();
    this.service.createMedico(this.dados).then(res => {
      this.close(res);
    }).finally(() => this.message.load_dismiss());
  }

}
