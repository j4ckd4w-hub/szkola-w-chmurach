import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { FactsModel, FactsQuery } from '@core/models';

@Injectable()
export class FactsService {
  private http: HttpClient = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly featureUrl = ``;

  list(params: FactsQuery): Observable<HttpResponse<FactsModel>> {
    return this.http.get<FactsModel>(`${this.baseUrl}/${this.featureUrl}?count=${params.count ? params.count : ''}`, { observe: 'response' });
  }
}
