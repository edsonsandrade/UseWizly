import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Client } from './client';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClientsService {

  private _urlClient          = "http://localhost:9000/Clients/";
  private _urlClients         = "http://localhost:9000/Clients";
  private _urlClientInsert    = "http://localhost:9000/ClientInsert";
  private _urlClientUpdate    = "http://localhost:9000/ClientUpdate";
  private _urlClientDelete    = "http://localhost:9000/ClientDelete/";

  private _urlUpdateClientPwd = "http://localhost:9000/updateClientPwd";

  constructor (private _http: Http) {
  }

  // getNewClient() {
  //   return this.client.newClient();
  // }

  getClient(clientId):Promise<Client> {
     return this._http.get(this._urlClient + clientId)
       .toPromise()
       .then(client => client.json());
  }

  getClients(lastName, numOfUsers) {
     return this._http.get(this._urlClients + "/" + lastName + "/" + numOfUsers)
        .map(resu => resu.json());
  }

  searchClientsByName(searchString) {
    console.log(this._urlClients + "ByName/" + searchString)
    return this._http.get(this._urlClients + "ByName/" + searchString)
       .map(resu => resu.json());
  }

  createClient(client)  {

    var headers = new Headers();

    headers.append('Content-Type', 'application/json');

    delete client["clientId"];

    return this._http.post(this._urlClientInsert, JSON.stringify(client), {headers: headers})
       .map(resu => resu.json());
  }

  updateClient(client):Promise<Client>  {

    var headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this._http.post(this._urlClientUpdate, JSON.stringify(client), {headers: headers})
         .toPromise()
         .then(user => user.json());
  }

  deleteClient(usersList)  {

    var headers = new Headers();

    headers.append('Content-Type', 'application/json');
    console.log("usersList: " + usersList)
    console.log(this._urlClientDelete+usersList)
    return this._http.delete(this._urlClientDelete+usersList, {headers: headers})
       .map(resu => resu.json());

  }

}
