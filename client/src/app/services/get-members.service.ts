import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetMembersService {
  private apiUrl = "http://localhost:3200/api/v1/members"

  constructor(private http: HttpClient) { }

  getMembers(): Observable<any> {
    let params = new HttpParams();
    return this.http.get(this.apiUrl, {params})
  }
}
