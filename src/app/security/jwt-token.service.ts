import {Injectable} from "@angular/core";


@Injectable()
export class EvolutionJwtTokenService {

  private adminLocalStorageItemName = 'admin-jwt-token' ;

  public setToken(token: string): void {
    localStorage.setItem(this.adminLocalStorageItemName, JSON.stringify({
      token: token
    }));
  }

  public getToken(): String {
    const item = JSON.parse(localStorage.getItem(this.adminLocalStorageItemName));
    const token = item && item.token;
    return token ? token : null;
  }

  public isLife(): boolean {
    return true;
  }

  public cleanToken(): void {
    localStorage.removeItem(this.adminLocalStorageItemName);
  }

}
