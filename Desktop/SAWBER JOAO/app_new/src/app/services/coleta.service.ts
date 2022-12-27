import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ColetaService {

  url = environment.url;

  constructor(
    private http: HttpClient
  ) { }


  createColeta(data): Promise<any> {
    return this.http.post(`${this.url}/app/coleta`, data).toPromise();
  }
  getColeta(id: any): Promise<any> {
    return this.http.get(`${this.url}/app/coleta/${id}`).toPromise();
  }
  updateColeta(data, id): Promise<any> {
    return this.http.put(`${this.url}/app/coleta/${id}`, data).toPromise();
  }

  createItemColeta(data): Promise<any> {
    return this.http.post(`${this.url}/app/coleta/item`, data).toPromise();
  }
  removeItemColeta(id): Promise<any> {
    return this.http.delete(`${this.url}/app/coleta/item/${id}`).toPromise();
  }

  getClinicas(queryParams: any): Promise<any> {
    return this.http.get(`${this.url}/app/coleta/getClinicas`, { params: queryParams }).toPromise();
  }
  getCustom(endpoint: string, queryParams: any = {}): Promise<any> {
    return this.http.get(`${this.url}/${'web/motoboy/available'}`, { params: queryParams }).toPromise();
  }

  getClinica(id: any): Promise<any> {
    return this.http.get(`${this.url}/app/coleta/getClinica/${id}`).toPromise();
  }

  checkColetaCode(code: any): Promise<any> {
    return this.http.get(`${this.url}/app/coleta/checkColetaCode/${code}`).toPromise();
  }

  getExameTypes(): Promise<any> {
    return this.http.get(`${this.url}/app/coleta/getExameTypes`).toPromise();
  }
  setExameTypes(data): Promise<any> {
    return this.http.post(`${this.url}/app/coleta/setExameTypes`, data).toPromise();
  }

  getSolicitacoes(queryParams: any = {}): Promise<any> {
    return this.http.get(`${this.url}/app/solicitacoes`, { params: queryParams }).toPromise();
  }
  getSolicitacao(id): Promise<any> {
    return this.http.get(`${this.url}/app/solicitacoes/${id}`).toPromise();
  }
  updateSolicitacao(id, dados): Promise<any> {
    return this.http.put(`${this.url}/app/solicitacoes/${id}`, dados).toPromise();
  }



  getDevolucoes(queryParams: any = {}): Promise<any> {
    return this.http.get(`${this.url}/app/devolucoes`, { params: queryParams }).toPromise();
  }
  getDevolucao(id): Promise<any> {
    return this.http.get(`${this.url}/app/devolucoes/${id}`).toPromise();
  }
  updateDevolucao(id, dados): Promise<any> {
    return this.http.put(`${this.url}/app/devolucoes/${id}`, dados).toPromise();
  }

}
