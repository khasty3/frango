import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { MotoboyService } from 'src/app/services/motoboy.service';

@Component({
  selector: 'app-notification-detalhe',
  templateUrl: './notification-detalhe.page.html',
  styleUrls: ['./notification-detalhe.page.scss'],
})
export class NotificationDetalhePage implements OnInit {

  coleta: any = { clinica: {}, medicos: [] };

  constructor(
    private routerActive: ActivatedRoute,
    private service: MotoboyService,
    private message: MessageService
  ) { }

  ngOnInit() {
    this.routerActive.params.subscribe(params => {
      console.log(params);
      if (params.coleta_id) {
        this.getDados(params.coleta_id);
      }
    }).unsubscribe();
  }

  getDados(uuid) {
    this.message.load_present();
    this.service.getColeta(uuid).then(res => {
      this.coleta = res;
    }).finally(() => this.message.load_dismiss());
  }

}
