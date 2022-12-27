import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  NavController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ColetaService } from 'src/app/services/coleta.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-solicitacoes',
  templateUrl: './solicitacoes.page.html',
  styleUrls: ['./solicitacoes.page.scss'],
})
export class SolicitacoesPage implements OnInit {
  userCurrent: any = {};
  filters: any = { portador_accepted: 1 };

  solicitacoes: any[] = [];

  constructor(
    private actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private auth: AuthService,
    private service: ColetaService,
    private message: MessageService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getSolicitacoes();
  }

  async getUser() {
    const session = await this.auth.getSession();
    console.log('session', session);
    if (!session) {
      return;
    }
    this.userCurrent = session.user;
    this.filters.portador_id = this.userCurrent.uuid;
    // this.getSolicitacoes();
  }

  async getSolicitacoes() {
    await this.getUser();

    this.message.load_present();
    this.service
      .getSolicitacoes(this.filters)
      .then((res) => {
        this.solicitacoes = res;
      })
      .finally(() => this.message.load_dismiss());
  }

  async openSolicitacao(solicitacao) {
    if (solicitacao.type == 'RETIRADA') {
      const actionSheet = await this.actionSheetController.create({
        header: `Retirada de Material`,
        subHeader: 'Informe o código para iniciar a coleta.',
        mode: 'ios',
        // cssClass: 'my-custom-class',
        buttons: [
          {
            text: 'Manual',
            icon: 'create-outline',
            handler: async () => {
              // console.log('Delete clicked');
              this.codeQRManual(solicitacao);
            },
          },
          {
            text: 'Ler QR Code',
            icon: 'qr-code-outline',
            handler: async () => {
              this.startQrCodeScan(solicitacao);
              
            },
          },
          {
            text: 'Sem coleta',
            icon: 'archive-outline',
            handler: async () => {
         this.semColeta(solicitacao);
            },
          },
        ],
      });
      await actionSheet.present();
    } else {
      if (
        !solicitacao.portador_accepted &&
        solicitacao.prioridade == 'URGENTE'
      ) {
        this.message.openModalConfirme({ solicitacao: solicitacao });
      } else {
        this.navCtrl.navigateForward(`/solicitacoes/${solicitacao.uuid}`);
      }
    }
  }

  async startQrCodeScan(solicitacao) {
    const code = await this.message.readQRCode();
    if (code != false) {
      this.coletaForm(code, solicitacao);
    }
  }



  async semColeta(solicitacao) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      // header: 'Prompt!',
      message: 'Você tem certeza disso?',
      backdropDismiss: false,
      mode: 'ios',
      buttons: [
        {
          text: 'Voltar',
          cssClass: 'secondary',
        },
        {
          text: 'Confirmar',
          handler: async ()=> {
            solicitacao.status = 'FINALIZADO';
            this.service
        .updateSolicitacao(solicitacao.uuid, solicitacao)
        .then((res) => {
          
            window.location.reload();
     
        })
        .finally(() => {
          //window.location.reload();
     
        });
          },
        },
      ],
    });

    await alert.present();
  }

  async codeQRManual(solicitacao) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      // header: 'Prompt!',
      message: 'Informe o código do QR Code manualmente.',
      backdropDismiss: false,
      mode: 'ios',
      inputs: [
        {
          name: 'code',
          type: 'tel',
          placeholder: 'Informe o código do QR Code.',
        },
      ],
      buttons: [
        {
          text: 'Voltar',
          cssClass: 'secondary',
        },
        {
          text: 'Confirmar',
          handler: (data) => {
            if (data.code == '') {
              return this.message.toastError('Informe o código...');
            }
            this.coletaForm(data.code, solicitacao);
          },
        },
      ],
    });

    await alert.present();
  }

  coletaForm(code, solicitacao) {
    this.message.load_present();
    let dadosColeta: any = {
      code_qr: code,
      clinica_id: solicitacao.clinica.uuid,
      solicitacao_id: solicitacao.uuid,
    };
    this.service
      .createColeta(dadosColeta)
      .then((res) => {
        this.navCtrl.navigateForward(`/coleta-form/${res.data.uuid}`, {
          queryParams: { solicitacao_id: solicitacao.uuid },
        });
      })
      .finally(() => this.message.load_dismiss());

    // this.service.checkColetaCode(code).then(() => {
    //   this.navCtrl.navigateForward(`/coleta-form/${solicitacao.clinica.uuid}/${code}`, {
    //     queryParams: { solicitacao_id: solicitacao.uuid }
    //   });
    // }).finally(() => this.message.load_dismiss());
  }
}
