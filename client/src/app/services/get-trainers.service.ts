import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedTrainers } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class GetTrainersService {
  private apiUrl = 'http://localhost:3200/api/v1/trainers/'
  constructor(private http: HttpClient) { }

  getTrainers(search: string, page: number, size: number) : Observable<PaginatedTrainers>{
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    params = search.length ? params.append('search', search) : params;

    return this.http.get<PaginatedTrainers>(this.apiUrl, { params });
  }
}
