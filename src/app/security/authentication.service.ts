/**
 * Created by Infant on 15.08.2017.
 */
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {DataTransferService} from '../service/data-transfer.service';
import {serverUrl} from '../common/rest-url';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {EvolutionJwtTokenService} from "./jwt-token.service";
import {AuthenticationRequestDto} from './dto/authentication-request.dto';
import {UserDto} from '../user/dto/user.dto';

@Injectable()
export class AuthenticationService {

  private authUrl = serverUrl + 'auth/admin';

  private adminUserLocalStorageName = 'admin-auth';

  constructor(private httpClient: HttpClient,
              private jwtTokenService: EvolutionJwtTokenService,
              private transfer: DataTransferService) {
  }

  public login(authenticationRequest: AuthenticationRequestDto): Observable<boolean> {
    return this.httpClient
      .post(this.authUrl, authenticationRequest)
      .map((response: HttpResponse<any>) => {
        let json: any = response;
        const token = json && json.token;
        if (token) {
          let u: UserDto = this.transfer.jsonToModelUserDTO(json.user);
          u.username = authenticationRequest.username;
          this.setAuthUser(u);

          this.jwtTokenService.setToken(token);
          return true;
        } else {
          return false;
        }
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public getAuth(): UserDto {
    let item: any = localStorage.getItem(this.adminUserLocalStorageName);
    if (item) {
      const u = JSON.parse(localStorage.getItem(this.adminUserLocalStorageName)).user;
      return this.transfer.jsonToModelUserDTO(u);
    } else {
      return new UserDto();
    }
  }

  public isAuth(): boolean {
    return this.jwtTokenService.getToken() != null;
  }

  public getToken(): String {
    return this.jwtTokenService.getToken();
  }

  public logout(): void {
    localStorage.removeItem(this.adminUserLocalStorageName);
    this.jwtTokenService.cleanToken();
  }

  private setAuthUser(user: any): void {
    localStorage.setItem(this.adminUserLocalStorageName, JSON.stringify({
      user: user
    }));
  }
}
