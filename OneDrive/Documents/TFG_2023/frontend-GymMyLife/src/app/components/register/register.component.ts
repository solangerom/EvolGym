import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import { RegisterService } from '../../services/register.service';
import { Register } from '../../models/register.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonsService } from 'src/app/services/commons.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('content') block: ElementRef;
  register: Register = new Register();
  closeResult = '';
  email: string = '';
  password: string = '';
  password2: string = '';
  name: String = '';
  emailRepe: boolean = false;
  errorDifferent: boolean = false;
  notEmail: boolean;
  noName: boolean;
  badPass: boolean;

  constructor(
    // private registerService: RegisterService,
    private modalService: NgbModal,
    private commonsService: CommonsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  showPopupRegister() {
    this.modalService
      .open(this.block, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  sendRegister() {
    this.emailRepe = false;
    this.errorDifferent = false;
    this.notEmail = false;
    this.noName = false;
    this.badPass = false;

    console.log("name: ", this.name)
    console.log("email: ", this.email)
    console.log("name: ", this.password)
    console.log("name: ", this.password2)

    let regexEmail2 = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+")
    console.log(regexEmail2.test(this.email))
    let regexPass = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")
    console.log(regexPass.test(this.password))
    if (this.name == "" || this.email == "" || this.password == "" || this.password2 == "") {
      this.noName = true;
    }
    else if (!regexEmail2.test(this.email)) {
      this.notEmail = true;
    }
    else if (this.password != this.password2) {
      this.errorDifferent = true;
    }
    else if (!regexPass.test(this.password)) {
      this.badPass = true;
    }
    else {
      this.register['name'] = this.name;
      this.register['email'] = this.email;
      this.register['password'] = this.password;
      this.authService.postRegister(this.register).subscribe(
        (response) => {
          console.log('response is ', response);
          console.log(response['status'])
          this.commonsService.setName(response['data']['name']);
          this.commonsService.setToken(response['data']['token']);
          this.modalService.dismissAll('Cross click')
        },
        (error) => {
          console.log('error is ', error);
          console.log("error email repe send")
          this.emailRepe = true;
        }
      );
    }
  }

getEmailRepe(){
  // console.log("error email repe bool")
  return this.emailRepe == true;
}

getNotEmail() {
  // console.log("error no es un mail")
  return this.notEmail == true;
}

getBadPass() {
  // console.log("error pass invalida")
  return this.badPass == true;
}

getErrorDifferent() {
  // console.log("error pass diferentes")
  return this.errorDifferent == true;
}

getNoName() {
  // console.log("error no hay nombre")
  return this.noName == true;
}

}