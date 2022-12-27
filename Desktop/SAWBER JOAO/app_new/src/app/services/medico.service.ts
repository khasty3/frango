import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  url = environment.url;

  constructor(
    private http: HttpClient
  ) { }

  getMedicos(queryParams: any): Promise<any> {
    return this.http.get(`${this.url}/app/medico`, { params: queryParams }).toPromise();
  }

  createMedico(data: any): Promise<any> {
    return this.http.post(`${this.url}/app/medico`, data).toPromise();
  }

  setMedicoClinica(dados): Promise<any> {
    return this.http.post(`${this.url}/app/medico/setMedicoClinica`, dados).toPromise();
  }

}
