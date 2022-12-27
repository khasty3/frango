import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MaloteService {

  url = environment.url;

  constructor(
    private http: HttpClient
  ) { }

  getClinicas(queryParams: any): Promise<any> {
    return this.http.get(`${this.url}/app/malote/getClinicas`, { params: queryParams }).toPromise();
  }

  getClinica(id: any): Promise<any> {
    return this.http.get(`${this.url}/app/malote/getClinica/${id}`).toPromise();
  }

  checkColetaCode(code: any): Promise<any> {
    return this.http.get(`${this.url}/app/malote/checkCode/${code}`).toPromise();
  }

  createColeta(data): Promise<any> {
    return this.http.post(`${this.url}/app/malote`, data).toPromise();
  }


  getReporte(dados: any): Promise<any> {
    return this.http.post(`${this.url}/app/malote/report`, dados).toPromise();
  }

}
