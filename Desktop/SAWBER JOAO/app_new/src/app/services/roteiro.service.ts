import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoteiroService {

  url = environment.url;

  constructor(
    private http: HttpClient
  ) { }

  getClinicas(queryParams: any): Promise<any> {
    return this.http.get(`${this.url}/app/roteiro/getClinicas`, { params: queryParams }).toPromise();
  }
  setClinica(data: any): Promise<any> {
    return this.http.post(`${this.url}/app/roteiro/setClinica`, data).toPromise();
  }
  removeClinica(data: any): Promise<any> {
    return this.http.post(`${this.url}/app/roteiro/removeClinica`, data).toPromise();
  }

}
