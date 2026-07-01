import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  
})
export class EventService {
  private apiUrl = 'http://localhost:5000/api/events';
  
  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createEvent(eventData: any): Observable<any> {
    return this.http.post(this.apiUrl, eventData);
  }

  updateEvent(id: string, eventData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, eventData);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  rsvpEvent(eventId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${eventId}/rsvp`, { userId: userId });
  }

  cancelRsvp(eventId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${eventId}/cancel-rsvp`, {userId: userId });
  }
}