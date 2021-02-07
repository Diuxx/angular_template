import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/Auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  private emailRegEx: string = '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$';

  public checkoutForm = this.formBuilder.group({
    login: new FormControl('', [
      Validators.email,
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  // child event
  @Output() displaySignUpEvent = new EventEmitter<void>();

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

  /**
   * Submit auth form */
  public onSubmit(): void {
    // fields not valids
    if(!this.checkoutForm.valid) return; 

    // auth
    this.authService.SignIn(
      this.checkoutForm.value.login,
      this.checkoutForm.value.password
    );
  }

  public displaySignUp(): void {
    if(this.displaySignUpEvent.observers.length > 0)
    { 
      this.displaySignUpEvent.emit();
    }
  }

}
