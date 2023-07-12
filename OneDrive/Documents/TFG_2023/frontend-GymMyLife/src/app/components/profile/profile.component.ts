import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonsService } from 'src/app/services/commons.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User;
  name: string;
  email: string;
  old_psw: string;
  new_psw: string;
  repeat_psw: string;
  busquedas: string[];
  errorChange: boolean = false;
  errorDifferent: boolean = false;
  changeOK: boolean;
  notEmail: boolean;
  changeEmail: boolean;
  badPass: boolean;

  public data: any[];
  public toolbar: string[];
  public selectOptions: Object;
  public editSettings: Object;

  constructor(
    private commonsService: CommonsService,
    private profileService: ProfileService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.showSearches();
    // this.selectOptions = { persistSelection: true };
    // this.editSettings = { allowDeleting: true };
    this.toolbar = ['Search'];
  }

  getUser() {
    this.profileService.getUser().subscribe(
      (response) => {
        console.log('response is ', response);
        this.name = response['data']['name'];
        this.email = response['data']['email'];
      },
      (error) => {
        console.log('error is ', error);
      }
    );
  }

  updateUser() {
    //comprobamos que campos no estén vacios y formato email
    this.notEmail = false;
    this.changeEmail = false;
    let regexEmail2 = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+")
    console.log(regexEmail2.test(this.email))
    if (regexEmail2.test(this.email) && this.name != "") {
      this.profileService.updateUser(this.name, this.email).subscribe(
        (response) => {
          console.log('response is ', response);
          console.log(response['data']['name']);
          this.commonsService.setName(response['data']['name']);
          this.changeEmail = true;
        },
        (error) => {
          console.log('error is ', error);
        }
      );
    }
    else {
      this.notEmail = true;
    }

  }

  updatePsw() {
    this.errorChange = false;
    this.errorDifferent = false;
    this.changeOK = false;
    this.badPass = false;
    if (this.new_psw != this.repeat_psw) {
      this.errorDifferent = true;
    }
    else {
      let regexPass = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")
      console.log(regexPass.test(this.new_psw))
      if (regexPass.test(this.new_psw)) {
        this.profileService
          .updatePsw(this.old_psw, this.new_psw, this.repeat_psw)
          .subscribe(
            (response) => {
              if (response['status'] == 403) {
                this.errorChange = true;
              }
              else {
                this.changeOK = true;
              }
              console.log('response is: ', response);
            },
            (error) => {
              console.log('error is ', error);
              this.errorChange = true;
            }
          );
      }
      else {
        this.badPass = true;
      }

    }

  }

  getErrorChange() {
    // console.log("contraseña antigua incorrecta")
    return this.errorChange == true;
  }

  getErrorDifferent() {
    // console.log("error pass diferentes")
    return this.errorDifferent == true;
  }

  getChangeOK() {
    // console.log("cambio hecho")
    return this.changeOK == true;
  }

  getChangeEmail() {
    // console.log("cambio hecho")
    return this.changeEmail == true;
  }

  getNotEmail() {
    return this.notEmail == true;
  }

  getBadPass() {
    return this.badPass == true;
  }

  showSearches() {
    this.profileService.showSearches().subscribe(
      (response) => {
        this.busquedas = response['data'];
        console.log('MOSTRAR BUSQUEDAS: ', this.busquedas);
        this.data = response['data'];
      },
      (error) => {
        console.log('error is ', error);
      }
    );
  }
}
