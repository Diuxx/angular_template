import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public checkoutForm = this.formBuilder.group({
    displayName: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    confimPassword: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  /**
   * Submit auth form */
  public onSubmit(): void {
    return;
  }

  /**
   * User can send the form or not */
  public canSubmit(): boolean {
    return false;
  }

  public displaySignIn(): void {
    return;
  }

}
