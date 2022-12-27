import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MedicoService } from 'src/app/services/medico.service';
import { MedicoFormPage } from '../../medico-form/medico-form.page';

@Component({
  selector: 'app-modal-medicos',
  templateUrl: './modal-medicos.page.html',
  styleUrls: ['./modal-medicos.page.scss'],
})
export class ModalMedicosPage implements OnInit {

  filters: any = { termo: '' };

  dataSource = [];

  loading: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private service: MedicoService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    // const session = await this.authService.getSession();
    // console.log(session);
    // this.filters.user_id = session.user.uuid;
    this.search();
  }

  close(params = undefined) {
    this.modalCtrl.dismiss(params);
  }

  doRefresh(event) {
    this.search();
    event.target.complete();
  }

  search() {
    this.loading = true;
    this.service.getMedicos(this.filters).then(res => {
      this.dataSource = res;
    }).finally(() => this.loading = false);
  }

  changeItem(item) {
    this.close(item);
  }

  async addMedico() {
    const modal = await this.modalCtrl.create({
      component: MedicoFormPage
    });

    await modal.present();
    modal.onDidDismiss().then(res => {
      this.search();
    })
  }

}
