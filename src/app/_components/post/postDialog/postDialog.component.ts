import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/Auth.service';
import { FormComponent } from '../../form/form.component';

@Component({
  selector: 'app-postDialog',
  templateUrl: './postDialog.component.html',
  styleUrls: ['./postDialog.component.scss']
})
export class PostDialogComponent extends FormComponent implements OnInit {

  constructor(
    formBuilder: FormBuilder,
    authService: AuthService,
  ) {
    super(formBuilder, authService);
    super.formCheckout = this.formBuilder.group({
      img: new FormControl('', []),
      post: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }

}
