import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class NameListService {

  /**
   * The array of initial names provided by the service.
   * @type {Array}
   */
  names: string[] = [];

  /**
   * Contains the currently pending request.
   * @type {Observable<string[]>}
   */
  private request: Observable<string[]>;

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource. If there was a previous successful request
   * (the local names array is defined and has elements), the cached version is returned
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<string[]> {
    if (this.names && this.names.length) {
      return Observable.from([this.names]);
    }
    if (!this.request) {
        let headers = new Headers();
            headers.append('school_id', '4067');

      this.request = this.http.get('http://0.0.0.0:8000/dashboard/v1/students-list/', {headers: headers})
        .map((response: Response) => response.json())
        .map((data: string[]) => {
          console.log("HERE", data);
          this.request = null;
          return this.names = data;
        }).publishReplay(1).refCount();
    }
    return this.request;
  }

  /**
   * Adds the given name to the array of names.
   * @param {string} value - The name to add.
   */
  add(value: string): void {
    this.names.push(value);
  }
}

