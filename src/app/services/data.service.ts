import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    api = 'http://www.cityeye.co.il:8888/api/';
    public dataLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(null);

    constructor(private http: HttpClient) {
    }

    getClientData(phoneNumber): Observable<any> {
        return this.http.get<any>(`${this.api}get/client/` + phoneNumber)
            .pipe(
                catchError(this.errorHandle)
            );
    }

    getStepsData(tenantID): Observable<any> {
        return this.http.get<any>(`${this.api}get/steps/` + tenantID)
            .pipe(
                catchError(this.errorHandle)
            );
    }

    errorHandle(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }
}
