import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.httpClient.get(`${baseURL}/products`);
  }

  resetNamePlate(): Observable<any> {
    return this.httpClient.get(`${baseURL}/products`);
  }

  resetQuickEntry(): Observable<any> {
    return this.httpClient.get(`${baseURL}/productss`);
  }

  resetShopNotes(): Observable<any> {
    return this.httpClient.get(`${baseURL}/products`);
  }

}
