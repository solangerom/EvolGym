import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from 'src/environments/endpoints';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.post(`${endpoints.profile}/infoUser`, {});
  }

  updateUser(name: string, email: string) {
    return this.http.post(`${endpoints.profile}/changeData`, { name, email });
  }

  updatePsw(old_psw: string, new_psw: string, new_psw2: string) {
    console.log(old_psw, new_psw);
    return this.http.post(`${endpoints.profile}/changePsw`, {
      old_psw,
      new_psw,
      new_psw2,
    });
  }

  showSearches() {
    return this.http.post(`${endpoints.profile}/showSearches`, {});
  }
}
