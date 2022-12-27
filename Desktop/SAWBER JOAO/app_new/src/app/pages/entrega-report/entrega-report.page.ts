import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EntregaService } from 'src/app/services/entrega.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-entrega-report',
  templateUrl: './entrega-report.page.html',
  styleUrls: ['./entrega-report.page.scss'],
})
export class EntregaReportPage implements OnInit {

  reporte: any[] = [];

  user: any = {};
  filters: any = { tipo: '2', status: 10, data_ini: this.getTEmp(), data_fim: this.getTEmp(1) };

  total: number = 0;

  constructor(
    // private storage: Storage,
    private authService: AuthService,
    private service: EntregaService,
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
      this.getTotal();

    }).finally(() => this.message.load_dismiss());
  }

  getTEmp(type = 0) {
    let date = new Date();
    if (type == 0) {
      return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  getTotal() {
    let total = 0;
    this.reporte.forEach(rep => {
      total += parseFloat(rep.taxa_entrega);
    });

    this.total = total;
  }

}
