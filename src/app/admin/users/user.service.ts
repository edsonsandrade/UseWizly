import { Injectable }     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { User }           from './user';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  private _urlUser          = "http://localhost:9000/users/";
  private _urlUsers         = "http://localhost:9000/users";
  private _urlUserInsert    = "http://localhost:9000/userInsert";
  private _urlUserUpdate    = "http://localhost:9000/userUpdate";
  private _urlUserDelete    = "http://localhost:9000/userDelete/";

  private _urlUpdateUserPwd = "http://localhost:9000/updateUserPwd";

  constructor (private _http: Http) {
  }

  getNewUser() {
    return new User(0, 0, '', '', '', '', '', '', '', '', true);
  }

  getUser(userId):Promise<User> {
     return this._http.get(this._urlUser + userId)
       .toPromise()
       .then(user => user.json());
  }

  getUsers(lastName, numOfUsers) {
     return this._http.get(this._urlUsers + "/" + lastName + "/" + numOfUsers)
        .map(resu => resu.json());
  }

  searchUsersByName(searchString) {
    console.log(this._urlUsers + "ByName/" + searchString)
    return this._http.get(this._urlUsers + "ByName/" + searchString)
       .map(resu => resu.json());
  }

  createUser(usr)  {

    var headers = new Headers();

    headers.append('Content-Type', 'application/json');

    delete usr["userId"];

    return this._http.post(this._urlUserInsert, JSON.stringify(usr), {headers: headers})
       .map(resu => resu.json());
  }

  updateUser(usr):Promise<User>  {

    var headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this._http.post(this._urlUserUpdate, JSON.stringify(usr), {headers: headers})
         .toPromise()
         .then(user => user.json());
  }

  deleteUser(usersList)  {

    var headers = new Headers();

    headers.append('Content-Type', 'application/json');
    console.log("usersList: " + usersList)
    console.log(this._urlUserDelete+usersList)
    return this._http.delete(this._urlUserDelete+usersList, {headers: headers})
       .map(resu => resu.json());

  }

  updateUserPassword(usr):Promise<User> {

    var headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this._http.post(this._urlUpdateUserPwd, JSON.stringify(usr), {headers: headers})
         .toPromise()
         .then(user => user.json());
  }

}
