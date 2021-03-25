import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.infoEmonk;
   }

   getSkus(categoria:number):Observable<any>{

    return this.http.get(this.url +  `/api/productos/categoria/${categoria}`);
   }
}
