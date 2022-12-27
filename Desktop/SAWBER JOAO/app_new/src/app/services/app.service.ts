import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class AppService {

   public loginObserver: Subject<any> = new Subject<any>();

   passValue(data) {
      //passing the data as the next observable
      this.loginObserver.next(data);
   }

}
