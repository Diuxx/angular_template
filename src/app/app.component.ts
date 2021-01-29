import { Component, OnInit } from '@angular/core';
import { AppInit } from 'src/app/_core/init/appInit';

// primeng ripple
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'front';
  constructor(
    private initApp: AppInit,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    console.log('> (model) | angular template model');
  }
}
