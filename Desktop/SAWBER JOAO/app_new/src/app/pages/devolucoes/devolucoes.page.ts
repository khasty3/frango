import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ColetaService } from 'src/app/services/coleta.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-devolucoes',
  templateUrl: './devolucoes.page.html',
  styleUrls: ['./devolucoes.page.scss'],
})
export class DevolucoesPage implements OnInit {
  userCurrent: any = {};
  filters: any = {};

  devolucoes: any[] = [];

  constructor(
    private nav: NavController,
    private auth: AuthService,
    private service: ColetaService,
    private message: MessageService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getDevolucoes();
  }

  async getUser() {
    const session = await this.auth.getSession();
    if (!session) {
      return;
    }
    this.userCurrent = session.user;
    this.filters.portador_id = this.userCurrent.uuid;
    // this.getDevolucoes();
  }

  async getDevolucoes() {
    await this.getUser();

    this.message.load_present();
    this.service
      .getDevolucoes(this.filters)
      .then((res) => {
        this.devolucoes = res;
      })
      .finally(() => this.message.load_dismiss());
  }

  async openForm(item) {
    if (!item.portador_accepted && item.prioridade == 'URGENTE') {
      const response = await this.message.openModalConfirme({
        devolucao: item,
      });
      if (response) {
        this.getDevolucoes();
      }
    } else {
      this.nav.navigateForward(`/devolucoes/${item.uuid}`);
    }
  }
}
