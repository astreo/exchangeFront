import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Transaction } from '../models/transaction.model';
import { UtilService } from './util.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private get url(): string {
    return environment.apiUrl;
  }

  private get headers(): HttpHeaders { return this.utilService.getHeather(); }

  constructor(private http: HttpClient, private utilService: UtilService) { }

  createTransaction(transaction: Transaction): Observable<any> {
    console.log('transaction: ' + JSON.stringify(transaction));
    console.log('url: ', `${this.url}/transactions`);
    return this.http.post(`${this.url}/transactions`, transaction, { headers: this.headers, observe: 'response' })
      .pipe(
        map(
          (resp: any) => {
            console.log('respuesta: ', resp.body)
            return resp.body;
          }
        )
      )
      ;

  }
}
