
import { Component, OnInit, Input }     from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { User }                         from './user';
import { UserService }                  from './user.service';

import { AppServices }                  from '../../app.service';
import { ListService }                  from '../../services/list.service';

import { InfiniteScrollModule }         from "ngx-infinite-scroll";
import { DeleteMark }                   from '../../components/deleteMark.component';

import {Observable}                     from 'rxjs/Observable';

declare var Materialize: any;
declare var jQuery: any;

@Component({
  selector: 'rows',
  templateUrl: './usersList.component.html',
  styleUrls: ['../../services/list.service.css']
})

export class UsersListComponent implements OnInit {

  user: User;
  rows = [];
  searchString = "";

  isLoaded    = false;
  submitted   = false;
  noMoreRows  = false;


  private language: any;

  //private _lastShown = 0;
  private _pageSize = 20;
  private rowsLength = 0;
  private _lastName = "a";

  constructor (
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private appServices: AppServices,
    public  listService: ListService

  ) {}

  ngOnInit() {

    // jQuery(document).ready(function() {
    //   jQuery('.modal').modal();
    // });

    jQuery(document).ready(function() {
      // Change padding and border for search field at right top
      var firstField = jQuery( ".mat-input-infix").first().css( {"padding": "0px","border-top": "0px" });
      jQuery('.modal').modal();
    });

    this.appServices.getLang('pt_br', 'users')
    .subscribe(data => this.language = data);

    // Creating an observable for list's search field
    this.listService.onSearchRequest("searchString")
      .subscribe(data => this.searchUsers(data));

    this.userService.getUsers(this._lastName, this._pageSize * 3)
      .subscribe(usrs => {
        if (!usrs)
          Materialize.toast(this.language.erros._listNoRecords, 4000);
        this.listService.loadRows(usrs, true);
        this.rows = this.listService.paginate();
        this.isLoaded = true;
      });
  }

  resetUserList() {
    this.resetListControlVariables();
    this.userService.getUsers(this._lastName, this._pageSize * 3)
    .subscribe(usrs =>
      { this.listService.loadRows(usrs, true);
        this.rows = this.listService.paginate();
        this.isLoaded = true;
        this.noMoreRows = false;
        console.log(this.rows)
      })
    }

  loadPageOfUsers() {

    if (this.noMoreRows) return;

    if (this.listService.endOfSubset()) {
        this.isLoaded = false;
       this.userService.getUsers(this._lastName, this._pageSize * 3)
       .subscribe(usrs =>
         {
          if(usrs.length>0) {
             this.listService.loadRows(usrs, false);
             this.rows        = this.listService.paginate();
             this.user        = this.rows[this.rows.length-1];
             this._lastName   = this.user.name;
          } else {
            this.noMoreRows = true;
          }
          this.isLoaded   = true;
         });
    } else {
      this.rows       = this.listService.paginate();
      this.user       = this.rows[this.rows.length-1];
      this._lastName  = this.user.name;
    }

  }

  resetListControlVariables() {
    this._lastName    = "a";
    this.searchString = "";
    this.noMoreRows = false;
    this.listService.resetDeleteList();
    this.listService.resetLastShown();
  }

  onSelectUser(userId: number) {
    this.router.navigate([userId], {relativeTo: this.route });
  }

  newUser() {
    this.router.navigate(['newUser'], {relativeTo: this.route });
  }

  deleteUsers() {

    var deleteList = this.listService.getDeleteList();

    return this.userService.deleteUser(deleteList)
      .subscribe(usr => {
         this.listService.removeDeleteRows(deleteList);
      });
  }

  searchUsers(searchString: string) {

    this.isLoaded = false;
    this.resetListControlVariables();
    this.searchString = searchString;
    this.userService.searchUsersByName(this.searchString)
      .subscribe(usrs =>
        {
          this.listService.loadRows(usrs, true);
          this.rows = this.listService.paginate();
          this.isLoaded = true;
        });
  }

}
