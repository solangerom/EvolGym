import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../../environments/endpoints';

@Injectable({
  providedIn: 'root',
})
export class MunicipalityService {
  constructor(private http: HttpClient) { }

  getListaPueblos() {
    return this.http.get(`${endpoints.municipality}/listVillages`);
  }

  getBusqueda(idMunicipality: number) {
    return this.http.post(`${endpoints.municipality}/busqueda`, {
      idMunicipality,
    });
  }

  getInfoPueblo(idMunicipality: number) {
    return this.http.post(`${endpoints.municipality}/infoPueblo`, {
      idMunicipality,
    });
  }

  getEstaciones(idMunicipality: number) {
    return this.http.post(`${endpoints.municipality}/stations`, {
      idMunicipality,
    });
  }

  getCentrosMedicos(idMunicipality: number) {
    return this.http.post(`${endpoints.municipality}/medicalcenters`, {
      idMunicipality,
    });
  }

  getSupermercados(idMunicipality: number, idSearch: number) {
    return this.http.post(`${endpoints.municipality}/supermarkets`, {
      idMunicipality,
      idSearch,
    });
  }

  getRestaurantes(idMunicipality: number, idSearch: number) {
    return this.http.post(`${endpoints.municipality}/restaurants`, {
      idMunicipality,
      idSearch,
    });
  }

  getNoticias(idMunicipality: number, idSearch: number) {
    return this.http.post(`${endpoints.municipality}/news`, {
      idMunicipality,
      idSearch,
    });
  }

  getTopMunicipios() {
    return this.http.get(`${endpoints.municipality}/topsearches`, {
    });
  }
}
