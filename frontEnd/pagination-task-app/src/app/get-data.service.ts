import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  constructor(private http: HttpClient) { }
  getAllData(page, limit='10'): Observable<any> {
    return this.http.get(`http://localhost:3000/all`, {
     params: {
         page,
         limit
     }
    });
  }
}
