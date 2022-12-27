import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { MaloteService } from 'src/app/services/malote.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-malote-report',
  templateUrl: './malote-report.page.html',
  styleUrls: ['./malote-report.page.scss'],
})
export class MaloteReportPage implements OnInit {

  reporte: any = [];

  user: any = {};
  filters: any = { tipo: 1, status: 1 };

  constructor(
    // private storage: Storage,
    private authService: AuthService,
    private service: MaloteService,
    private message: MessageService
  ) { }

  async ngOnInit() {
    const session = await this.authService.getSession();
    console.log(session);
    this.user = session.user;

    this.filters.portador_id = this.user.uuid;
    // this.getReport();
  }


  getReport() {
    this.message.load_present();
    this.service.getReporte(this.filters).then((res) => {

      this.reporte = res;

    }).finally(() => this.message.load_dismiss());
  }

}
