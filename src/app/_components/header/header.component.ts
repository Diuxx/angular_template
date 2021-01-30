import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/shared/services/Auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  signInDisplay: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  showSignInDialog() {
    this.signInDisplay = true;
  }
}
