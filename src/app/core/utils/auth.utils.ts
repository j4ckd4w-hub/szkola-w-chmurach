import { Injectable } from "@angular/core";

@Injectable()
export class AuthUtils {
  set accessToken(accessToken: string) {
    localStorage.setItem('access_token', accessToken);
  }

  get accessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  removeToken(): void {
    localStorage.removeItem('access_token');
  }

  isTokenValid(): boolean {
    const token = this.accessToken;
    if (!token) {
      return false;
    }
    /*
    Na potrzeby mocka usuwamy walidację
    */

    // decode the token
    // const jwtHelper = new JwtHelperService();
    // // check expiry date
    // const isTokenExpired = jwtHelper.isTokenExpired(token);
    // if (isTokenExpired) {
    //   localStorage.clear();
    //   return false;
    // }
    return true;
  }

  isTokenNotValid(): boolean {
    return !this.isTokenValid();
  }

  logout(): void {
    this.removeToken();
  }
}
