import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CidadeEstado } from '../models/cidade-estado.model';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {

  constructor(private http: HttpClient) { }

  public listaDeEstadosIbge(): Observable<CidadeEstado> {
    return this.http.get<CidadeEstado>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/?orderBy=nome`
    );
  }

  public listaDeCidadesIbge(uf: string) {
    return this.http.get<CidadeEstado>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios/?orderBy=nome`
    )
  }
}
