import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Login } from '../../models/login.model';
import { RegisterComponent } from 'src/app/components/register/register.component';
// import { LoginService } from '../../services/login.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonsService } from 'src/app/services/commons.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // @Input() show: boolean;
  user: string = '';
  password: string = '';
  respuesta: string = '';
  login: Login = new Login();
  closeResult: string = '';
  @ViewChild('content') block: ElementRef;
  @ViewChild(RegisterComponent) child: RegisterComponent; //hijo referenciado
  errorLogin: boolean = false;
  noName: boolean;

  constructor(
    // private loginService: LoginService,
    private router: Router,
    private modalService: NgbModal,
    private commonsService: CommonsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  showRegister() {
    this.child.showPopupRegister();
  }

  showPopupLogin() {
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

  sendLogin() {
    this.noName = false;
    this.errorLogin = false;
    this.login['email'] = this.user;
    this.login['password'] = this.password;
    if (this.user=="" || this.password==""){
      this.noName = true;
    }
    else{
      this.authService.postLogin(this.login).subscribe(
        (response) => {
          console.log('response is ', response);
          this.commonsService.setName(response['data']['name']);
          this.commonsService.setToken(response['data']['token']);
          if (response['data']['db_idUser'] == 43) {
            this.router.navigate(['admin']);
          }
          this.modalService.dismissAll('Cross click')
        },
        (error) => {
          console.log('error is ', error);
          this.errorLogin = true;
        }
      );
    }
  
  }

  getErrorLogin(){
    // console.log("error login")
    return this.errorLogin == true;
  }

  getNoName() {
    // console.log("error no hay nombre")
    return this.noName == true;
  }

}
