import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoints } from '../../environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${endpoints.admin}/user-all`);
  }

  getMunicipiosMasBuscados() {
    return this.http.get(`${endpoints.admin}/muniBuscados`);
  }

  getRankingActivos() {
    return this.http.get(`${endpoints.admin}/rankingsActivos`);
  }


  getMunicipiosScrapeados() {
    return this.http.get(`${endpoints.admin}/muniScrapeados`);
  }

  getUsuariosMes() {
    return this.http.get(`${endpoints.admin}/RegisterMes`);
  }

  actData() {
    return this.http.get(`${endpoints.admin}/actData`);
  }
}
