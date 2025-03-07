import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { LoginDto, LoginModel } from '@core/models';

@Injectable()
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly featureUrl = `auth`;

  login(payload: LoginDto): Observable<HttpResponse<LoginModel>> {
    if (payload.email === 'admin@example.com' && payload.password === 'test1234') {
      return of(new HttpResponse({ body: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' } }));
    } else {
      return throwError(() => new HttpErrorResponse({ error: 'Invalid email or password', status: 401 }));
    }
    // return this.http.post<LoginModel>(`${this.baseUrl}/${this.featureUrl}/login`, payload, { observe: 'response' });
  }
}
