import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import {version} from 'package.json';
declare var window: any;

@Injectable()
export class AppInitService {

  // This is the method you want to call at bootstrap
  // Important: It should return a Promise
  public init() {
    return from(
        fetch('../assets/app-config.json').then(function(response) {
          return response.json();
        })
        .catch(error => console.error(error))
      ).pipe(
        map((config) => {
        window.config = config;
        return version;
      }));
  }

  constructor(private http: HttpClient) { }
}
