import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MethodsEnum } from 'src/app/core/enums/methods.enum';

const api = 'http://127.0.0.1:8000/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  public getDadosCliente = (idCliente: number): Observable<any> => {
    return this.http.get(`${api}/${idCliente}`);
  }

  public postPutCliente = (dados, method: string): Observable<any> => {
    if (MethodsEnum.PUT === method) {
        return this.http.put(api, dados);
    }
    return this.http.post(api, dados);
  }

  public getClientes = (): Observable<any> => {
    return this.http.get(`${api}`);
  }

  public deletCliente = (idCliente: number): Observable<any> => {
    return this.http.delete(`${api}/${idCliente}`);
  }
}
