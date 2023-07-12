import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../app/services/auth.service';
import { CommonsService } from '../app/services/commons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private commonsService: CommonsService
  ) {}
  title = 'GymMyLife';

}
