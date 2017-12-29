import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../authentication.service';
import {serverUrl} from '../../../common/rest-url';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthenticationRequestDto} from '../../dto/authentication-request.dto';
import {NProgressService} from '../../../service/nprogress.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  loading = false;
  error: HttpErrorResponse;
  authenticationRequest: AuthenticationRequestDto = new AuthenticationRequestDto();
  isRestLoad = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.isRestLoad = false;
    this.loading = false;
    NProgressService.start();
    this.authenticationService.logout();
    this.wakeUpRest();
  }

  wakeUpRest(): void {
    this.httpClient
      .get(serverUrl + 'index')
      .map(res => res)
      .subscribe(data => {
          NProgressService.done();
          this.isRestLoad = true;
        },
        (err) => {
          console.log(err);
          if (err && err.status === 200) {
            this.isRestLoad = true;
          } else {
            this.ngOnInit();
          }

          NProgressService.done();
        });
  }

  login() {
    console.log('start login');
    NProgressService.start();
    this.loading = true;
    this.authenticationService.login(this.authenticationRequest)
      .subscribe(result => {
        console.log(result);
        if (result === true) {
          // login successful
          this.router.navigate(['home/' + this.authenticationService.getAuth().id]);
        }
        this.loading = false;
        NProgressService.done();
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.loading = false;
        this.error = error;
        NProgressService.done();
        this.authenticationRequest.password = '';
      });
  }
}
