import { Component } from '@angular/core';
import {AuthenticationService} from './security/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthenticationService) {}

  public isAuth(): boolean {
    return this.authService.isAuth();
  }

}
