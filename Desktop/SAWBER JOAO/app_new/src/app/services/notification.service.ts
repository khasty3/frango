import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  url = environment.url;

  constructor(
    private http: HttpClient
  ) { }

  getListing(queryParams: any): Promise<any> {
    return this.http.get(`${this.url}/app/notification`, { params: queryParams }).toPromise();
  }

}
