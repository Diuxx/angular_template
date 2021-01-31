import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/shared/services/Auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // variables
  isAuth: boolean;
  signInDisplay: boolean = false;

  constructor(
    public authService: AuthService,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.isAuth = this.authService.isLoggedIn;
    if(!this.isAuth) {
      this.signInDisplay = true ;
    } else {
      console.log(this.authService.getUserData());
    }
  }

  public showSignInDialog(): void {
    this.signInDisplay = true;
  }
}
