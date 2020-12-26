import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilService } from './util.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  private get url(): string {
    return environment.apiUrl;
  }

  private get headers(): HttpHeaders { return this.utilService.getHeather(); }

  constructor(private http: HttpClient, private utilService: UtilService) { }

  getRates(): Observable<any> {
    return this.http.get(`${this.url}/exchangerates`, { headers: this.headers, observe: 'response' })
      .pipe(
        map(
          (resp: any) => {
            console.log('respuesta', resp.body);
            return resp.body;
          }
        )
      )
      ;
  }
}
