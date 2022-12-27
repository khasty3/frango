import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ColetaService } from 'src/app/services/coleta.service';

@Component({
  selector: 'app-modal-clinicas',
  templateUrl: './modal-clinicas.component.html',
  styleUrls: ['./modal-clinicas.component.scss'],
})
export class ModalClinicasComponent implements OnInit {

  filters: any = { termo: '' };

  dataSource = [];

  loading: boolean = false;

  @Input() roteiro: boolean;

  constructor(
    private modalCtrl: ModalController,
    private service: ColetaService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    const session = await this.authService.getSession();
    console.log(session);
    this.filters.user_id = session.user.uuid;
    if (this.roteiro) {
      this.filters.dia = new Date().getDay();
    }
    this.search();
  }

  close(params = undefined) {
    this.modalCtrl.dismiss(params);
  }

  getDay() {
    const day = new Date().getDay();
    const days = ['', 'Segunda Feira', 'Terça Feira', 'Quarta Feira', 'Quinta Feira', 'Sexta Feira', 'Sábado', 'Domingo'];

    return days[day];
  }

  doRefresh(event) {
    this.search();
    event.target.complete();
  }

  search() {
    this.loading = true;
    this.service.getClinicas(this.filters).then(res => {
      this.dataSource = res;
    }).finally(() => this.loading = false);
  }

  changeItem(item) {
    this.close(item);
  }

}
