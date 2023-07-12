import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { CommonsService } from 'src/app/services/commons.service';
import { CarritoComponent } from 'src/app/components/carrito/carrito.component';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  name: string = '';

  @ViewChild(LoginComponent) child: LoginComponent;
  @ViewChild(CarritoComponent) child2: CarritoComponent;

  constructor(
    private commonsService: CommonsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.showName();
  }

  showLogin() {
    this.child.showPopupLogin();
  }

  showName() {
    return (this.name = this.getName());
  }

  getName() {
    return this.commonsService.getName();
  }

  getToken() {
    return this.commonsService.getToken();
  }

  endSession() {
    this.authService.postendSession().subscribe(
      (response) => {
        console.log('response is ', response);
      },
      (error) => {
        console.log('error is ', error);
      }
    );
    this.commonsService.endSession();
  }
  isLogged() {
    return this.getName() != '';
  }
  showCarrito() {
    this.child2.showPopupCarrito();
  }
}
