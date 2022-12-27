import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MotoboyService } from 'src/app/services/motoboy.service';

@Component({
  selector: 'app-modal-motoboy',
  templateUrl: './modal-motoboy.page.html',
  styleUrls: ['./modal-motoboy.page.scss'],
})
export class ModalMotoboyPage implements OnInit {

  filters: any = { termo: '' };

  dataSource = [];

  loading: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private service: MotoboyService,
    // private authService: AuthService
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
    this.service.getListing(this.filters).then(res => {
      this.dataSource = res;
    }).finally(() => this.loading = false);
  }

  changeItem(item) {
    this.close(item);
  }

}
