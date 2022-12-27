import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  async getSession() {
    await this.storage.create();
    const session = await this.storage.get('sessionSawber');
    return session;
  }

  async getExameTypes() {
    await this.storage.create();
    const dados = await this.storage.get('ExameTypeSawber');
    return dados;
  }

  login(data: any): Promise<any> {
    return this.http.post(`${this.url}/auth/login`, data).toPromise();
  }

  updateUser(data: any, id): Promise<any> {
    return this.http.put(`${this.url}/app/users/${id}`, data).toPromise();
  }

}
