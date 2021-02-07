import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/Auth.service';

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
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(new RegExp('(?=.*[A-Z])')), // check upper case char
      Validators.pattern(new RegExp('(?=.[0-9])')),  // check number value
      Validators.pattern(new RegExp('(?=.[a-z])')),  // lower case char
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ])
  }, { validator: this.checkPassword });

  public get confirmPassword() : AbstractControl | null {
    return this.checkoutForm.get('confirmPassword');
  }

  public get password() : AbstractControl | null {
    return this.checkoutForm.get('password');
  }

  public get email() : AbstractControl | null {
    return this.checkoutForm.get('email');
  }

  public get displayName() : AbstractControl | null {
    return this.checkoutForm.get('displayName');
  }

  public passwordRequiredConsign: string = 'This field is required';
  public passwordLengthConsign: string = 'Password must has at least 8 characters.';
  public passwordConsign: string = 'Password must has at least 1 lowercase character that include at least 1 uppercase character and 1 number.';

  @Output() displaySignInEvent = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
  ) { }

  ngOnInit() {
  }

  /**
   * Submit auth form */
  public onSubmit(): void {
    // fields not valids
    if(!this.checkoutForm.valid) return;
    
    // register
    this.authService.SignUp(
      this.email.value,
      this.confirmPassword.value
    );
  }

  /**
   * User can send the form or not */
  public canSubmit(): boolean {
    return (!this.displayName.errors && !this.email.errors && !this.password.errors && !this.confirmPassword.errors);
  }

  public displaySignIn(): void {
    if(this.displaySignInEvent.observers.length > 0)
    { 
      this.displaySignInEvent.emit();
    }
  }

  /**
   * check if passords and confirmPassord are equals
   * @param checkoutForm 
   */
  public checkPassword(checkoutForm: FormGroup) {
    let match: boolean = checkoutForm['value'].password === checkoutForm['value'].confirmPassword;
    if(!match) {
      checkoutForm.controls['confirmPassword'].setErrors({ passwordNotEquivalent: true }); 
    }
  }

}
