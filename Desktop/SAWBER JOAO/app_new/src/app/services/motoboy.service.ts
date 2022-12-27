import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MotoboyService {

  url = environment.url;

  constructor(
    private http: HttpClient
  ) { }

  getListing(queryParams: any): Promise<any> {
    return this.http.get(`${this.url}/app/motoboy`, { params: queryParams }).toPromise();
  }

  getColetas(queryParams: any): Promise<any> {
    return this.http.get(`${this.url}/app/motoboy/coletas`, { params: queryParams }).toPromise();
  }

  getColeta(uuid: string): Promise<any> {
    return this.http.get(`${this.url}/app/motoboy/coleta/${uuid}`).toPromise();
  }

  updateColeta(uuid: string, dados: any): Promise<any> {
    return this.http.put(`${this.url}/app/motoboy/coleta/${uuid}`, dados).toPromise();
  }

  getColetaItens(queryParams: any): Promise<any> {
    return this.http.get(`${this.url}/app/motoboy/coleta/item`, { params: queryParams }).toPromise();
  }

  //itens check
  updateItem(uuid: string, dados: any): Promise<any> {
    return this.http.put(`${this.url}/app/motoboy/coleta/item/${uuid}`, dados).toPromise();
  }

}
