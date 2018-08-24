import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-AUTH-TOKEN': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi5vcGVyYXRvciJ9.2yCoQiRKSoXJhCzSdbLxvLWPPx02jzPgkUpT2f0uDLeKKPIK00xLbLlUeTlS7eNq6cLOE7XM03sOWgmQ5TLvVA'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AppService {
  dataPasienRajal : any[];
  dataTempatTidurTerpakai : any[];
  dataSourceInfoKedatangan : any[];
  // constructor(private http : HttpClient) { }
  http: HttpClient;
  urlPrefix: string;
  urlLogin : string;

  constructor(http: HttpClient) {
    this.http = http;
    this.urlPrefix = 'http://localhost:8000/service/transaksi/';
    this.urlLogin = 'http://localhost:8000/service/web/';
  }

  getTransaksi(url) {
    return this.http.get(this.urlPrefix + url, httpHeaders);
  }

  postTransaksi(url, data) {
    return this.http.post(this.urlPrefix + url, data, httpHeaders);
  }
  postLogin(url, data) {
    return this.http.post(this.urlLogin + url, data);
  }

}
