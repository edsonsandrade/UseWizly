
import { Injectable }   from '@angular/core';
import { Language }     from '../../assets/languages/language'
import { AppServices }  from '../app.service'
import { Observable }     from 'rxjs/Observable';
declare var Materialize: any;
declare var $: any;

@Injectable()
export class ListService {

  deleteSelected = false;
  deleteConfirm = false;

  private keyups: Observable<string>;

  private deleteList = "";

  private language: any;

  private allRows = [];
  private rowsLength = 0;
  private _eof = false;
  private _lastShown = 0;

  private rows = [];
  private _pageSize = 20;

  constructor (private appServices: AppServices) {
    this.appServices.getLang('pt_br', 'users')
        .subscribe(data => { this.language = data});
  }

  onSearchRequest(searchFieldId) {
    this.keyups = Observable.fromEvent($("#" + searchFieldId), "keyup")
        .map((e: any) => e.target.value)
        .filter(text => text.length >= 3)
        .debounceTime(400);
        // .distinctUntilChanged();

    return this.keyups;
  }

  endOfSet() {
    return this._eof;
  }

  setPageSize(nSize: number) {
      this._pageSize = nSize;
  }

  getDeleteConfirm() {
    return this.deleteSelected;
  }

  getDeleteList() {
    // return deleteList without trailling comma and space
    return this.deleteList.substr(0, this.deleteList.length-2)
  }

  getDeleteSelected() {
    return this.deleteSelected;
  }

  toggleDelete(id: string) {
    if (this.deleteList.search(id) == -1)
      this.deleteList = this.deleteList + id + ", ";
    else
      this.deleteList = this.deleteList.replace(id + ", ", "");

    this.deleteSelected = (this.deleteList.length>0)
    if (!this.deleteSelected) this.deleteConfirm = false;
  }

  resetDeleteList() {
    this.deleteList = "";
    this.deleteSelected = false;
  }

  resetLastShown() {
    this._lastShown = 0;
  }

  loadRows(rows: string, newSet: boolean) {

    if (newSet) {
      this.allRows = [];
      this.rows = [];
    }

    if (rows.length > 0) {
      Array.prototype.push.apply(this.allRows, rows);
      this.rowsLength = this.allRows.length;
    } else {
      this._eof = true;
    }
  }

  paginate() {

    if (this._lastShown + this._pageSize <= this.rowsLength )
      this._lastShown = this._lastShown+this._pageSize
    else
      this._lastShown = this.rowsLength ;


    this.rows = this.allRows.slice(0, this._lastShown);

    return this.rows;
  }

  endOfSubset() {
    return this._lastShown === this.rowsLength;
  }

  confirmDelete(cancelConfirm: boolean) {
    if (cancelConfirm)
      Materialize.toast(this.language.messages._deleteConfirm, 4000)
    else
      Materialize.toast(this.language.messages._deleteCanceled, 4000);
    this.deleteConfirm  = cancelConfirm;
  }

  removeDeleteRows(strDeletedRows: string) {

    var userLength = this.rows.length;

    for (var nI = 0; nI < userLength; ) {
      if (strDeletedRows.search(this.rows[nI].userId) != -1) {
        this.rows.splice(nI, 1);
        userLength--
      } else  nI++;
    }
    Materialize.toast(this.language.messages._deleteSuccess, 4000);
    this.resetDeleteList();
  }
}
