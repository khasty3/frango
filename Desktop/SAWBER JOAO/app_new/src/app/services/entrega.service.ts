import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EntregaService {

  url = environment.url;

  constructor(
    private http: HttpClient
  ) { }

  listing(queryParams: any): Promise<any> {
    return this.http.get(`${this.url}/app/entrega`, { params: queryParams }).toPromise();
  }

  create(id: any, dados: any): Promise<any> {
    return this.http.post(`${this.url}/app/entrega/${id}`, dados).toPromise();
  }

  getById(id: any): Promise<any> {
    return this.http.get(`${this.url}/app/entrega/${id}`).toPromise();
  }

  getByCode(portador_id: any, filters: any = {}): Promise<any> {
    return this.http.get(`${this.url}/app/entrega/getByCode/${portador_id}`, { params: filters }).toPromise();
  }

  update(id: any, dados: any): Promise<any> {
    return this.http.put(`${this.url}/app/entrega/${id}`, dados).toPromise();
  }


  createReport(dados: any): Promise<any> {
    return this.http.post(`${this.url}/app/entrega/report`, dados).toPromise();
  }

  getReporte(dados: any): Promise<any> {
    return this.http.post(`${this.url}/app/entrega/reporte`, dados).toPromise();
  }

}
