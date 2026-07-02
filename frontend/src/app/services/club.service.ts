import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClubService {
  private apiUrl = 'http://localhost:5000/api/clubs';
  
  constructor(private http: HttpClient) {}

  getClubs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getClubById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createClub(clubData: any): Observable<any> {
    return this.http.post(this.apiUrl, clubData);
  }
  
  updateClub(id: string, clubData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, clubData);
  }

  deleteClub(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  joinClub(clubId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${clubId}/join`, { userId: userId });
  }

  leaveClub(clubId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${clubId}/leave`, { userId: userId });
  }
}