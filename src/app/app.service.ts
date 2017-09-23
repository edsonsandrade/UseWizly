import { Component, Input } from '@angular/core';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppServices {

    constructor(private http: Http) {
        //  var obj;
        //  this.getLanguage().subscribe(data => obj=data, error => console.log(error));
    }

    public getLang(_langCode: string, _moduleName: string) {
         return this.http.get("../assets/languages/" + _langCode + "/" + _moduleName + ".json")
                         .map(res => res.json());
                        // .catch(error => console.log(error));
     }
}
