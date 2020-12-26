import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public getHeather(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

}
