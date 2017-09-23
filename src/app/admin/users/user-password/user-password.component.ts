
import { Component, OnInit, Input, Output } from '@angular/core';
import {MdInputModule} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

import { User }                   from '../user';
import { UserService }            from '../user.service';

import { ActivatedRoute,
         RouterStateSnapshot,
         Router}                  from '@angular/router';

import { AppServices }            from '../../../app.service';

declare var Materialize: any;

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['../user.component.css']
})


export class UserPasswordComponent implements OnInit {

  @Input() user: User;
  @Output() pwdConfirm: string;
  @Input() language;

  constructor(
    private userService:  UserService,
    private route:        ActivatedRoute,
    private router:       Router,
    private appServices:  AppServices
  ) { }

  ngOnInit() {

    this.appServices.getLang('pt_br', 'users')
    .subscribe(data => this.language = data);

    this.route.data
    .subscribe( (data: { user: User }) =>
        {
          this.user = new User(data.user[0].userId, data.user[0].client, data.user[0].name,
                              data.user[0].login, data.user[0].password, data.user[0].userLanguage, data.user[0].image,
                              data.user[0].email, data.user[0].altEmail, data.user[0].passwordTip, data.user[0].active);
        }
    );

  }

  confirmPassword(): boolean {
  // Error when invalid control is dirty, touched, or submitted
    return this.pwdConfirm == this.user.password ;
  }

  closeForm() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  onSubmit(event) {

    event.preventDefault();

    return this.userService.updateUserPassword(this.user)
      .then(usr => {
         Materialize.toast(this.language.messages._pwdSuccess, 4000);
        this.router.navigate(['../'], {relativeTo: this.route });
      });
    }
}
