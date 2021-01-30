import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/Auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    login: '', password: ''
  });

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  public onSubmit(): void {
    // checkout data here
    console.warn('login submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }

}
