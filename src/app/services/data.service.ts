import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  take,
  throwError,
} from 'rxjs';
import { Image } from '../models/image.model';
import { Issue } from '../shared/Issue';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  allIssuesSubject = new BehaviorSubject<any>([]);
  searchInput = new BehaviorSubject<string>('');

  private _apiUrl = '';
  constructor(private http: HttpClient) {}
  getImage(): Observable<Image[]> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    });
    return this.http
      .get<Image[]>(`${this._apiUrl}/get_image_info`, { headers: header })
      .pipe(
        map((images) => images.slice(0, 100)),
        catchError(this.handleError)
      );
  }

  addIssue(issue: Issue): Observable<Issue> {
    return this.http
      .post<Issue>(`${this._apiUrl}/api/postIssue`, issue)
      .pipe(catchError(this.handleError));
  }

  deleteIssue(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this._apiUrl}/api/deleteIssue/${id}`)
      .pipe(catchError(this.handleError));
  }

  downloadImage(url: string, fileName: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      take(1),
      map((blob: Blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = {
      message: 'Unknown error!',
      status: error.status,
      statusText: error.statusText,
    };
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage.message = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side errors
      if (error.status === 0) {
        errorMessage.message = `Network error: Unable to reach the server. Please check your internet connection or try again later.`;
      } else {
        errorMessage.message = `Error Code: ${error.status} - Message: ${error.message}`;
      }
    }
    return throwError(() => errorMessage);
  }
}
