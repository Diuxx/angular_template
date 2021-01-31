import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/Auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public checkoutForm = this.formBuilder.group({
    login: new FormControl('', [
      Validators.email,
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  private emailRegEx: string = '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$';

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    console.log('user logged in ?', this.authService.isLoggedIn);
  }

  public getPassword(): AbstractControl | null {
    return this.checkoutForm.get('password');
  }
  
  public getLogin(): AbstractControl | null {
    return this.checkoutForm.get('login');
  }

  public canSubmit(): boolean {
    return (this.getLogin().errors?.required || this.getLogin().errors?.email || this.getPassword().errors?.required) ? false : true;
  }

  public onSubmit(): void {
    // checkout data here
    console.warn('login submitted', this.checkoutForm.value);
    console.log(this.checkoutForm.valid);

    // fields not valid
    if(!this.checkoutForm.valid) return;

    // auth
    let test: any = this.authService.SignIn(
      this.checkoutForm.value.login,
      this.checkoutForm.value.password
    );
  }

}
