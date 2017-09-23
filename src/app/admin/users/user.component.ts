
import {  Component,
          OnInit,
          Input,
          Output,
          EventEmitter,
          ViewChild}              from '@angular/core';

import { FormControl }            from '@angular/forms';

import { User }                   from './user';
import { UserService }            from './user.service';
import { UsersListComponent }     from './usersList.component';

import { ActivatedRoute,
         RouterStateSnapshot,
         Router}                  from '@angular/router';

import { AppServices }            from '../../app.service';
import { ListService }            from '../../services/list.service';
import { LangOption }             from '../../../assets/languages/langOption';

declare var Materialize: any;

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  @Input() userId: number;
  @Input() user: User;

  @Output() closed = new EventEmitter();

  submitted = false;
  deleteConfirm = false;
  originalValues: User;

  @Input() language;

  langOptions = new LangOption().getLang();

  constructor(
    private _userService: UserService,
    private _userList:    UsersListComponent,
    private route:        ActivatedRoute,
    private router:       Router,
    private appServices:  AppServices,
    private listService:  ListService
  ) {}

  ngOnInit() {

    this.appServices.getLang('pt_br', 'users')
    .subscribe(data => this.language = data);

    this.route.data
    .subscribe( (data: { user: User }) =>
        {
          if(data.user)
            this.loadUser(data.user)
          else
            this.newUser();
        }
    );
  }

  loadUser(usr) {
    this.deleteConfirm = false;
    //this.isHidden = false;
    if (usr.length > 0) {
      this.user = new User(usr[0].userId, usr[0].client, usr[0].name, usr[0].login, usr[0].password, usr[0].userLanguage, usr[0].image, usr[0].email, usr[0].altEmail, usr[0].passwordTip, usr[0].active);
      //this.originalValues = this.user;
      this.originalValues = Object.assign({}, this.user);
    } else {
      this.newUser();
    }
  };

  onSubmit(event) {

    event.preventDefault();
    if (this.user.userId == 0)
      return this._userService.createUser(this.user)
        .subscribe(usr => {
           this.user = usr;
           this.originalValues = Object.assign({}, this.user);
           this._userList.searchUsers(this.user.name);
           Materialize.toast(this.language.messages._insertSuccess, 4000);
        });
    else
      return this._userService.updateUser(this.user)
        .then(usr => {
          Materialize.toast(this.language.messages._updateSuccess, 4000);
          this.user = usr[0];
          console.log(usr[0])
          this.originalValues = Object.assign({}, this.user);
          this._userList.searchUsers(this.user.name);
        });
  };

  confirmDelete(cancelConfirm) {
    if (cancelConfirm)
      Materialize.toast(this.language.messages._deleteConfirm, 4000)
    else
      Materialize.toast(this.language.messages._deleteCanceled, 4000);
    this.deleteConfirm = cancelConfirm;
  }

  onDeleteUser() {
    this.deleteConfirm = false;
    return this._userService.deleteUser(this.user.userId.toString())
      .subscribe(usr => {
         console.log(usr);
         this.listService.removeDeleteRows(this.user.userId.toString());
         //Materialize.toast(this.language.messages._deleteSuccess, 4000);
         this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

  // TODO:  remove this when we're done
  get diagnostic() { return JSON.stringify(this.user)}

  newUser() {
    this.user = new User(0, 0, '', '', '', '', '', '', '', '', true);
  }

  closeForm() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  editPassword(event) {
    event.preventDefault();
    this.router.navigate(['editPwd'], { relativeTo: this.route });
  }

}
