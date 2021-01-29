import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // variables
  public search: string;
  public autoCompleteResults: string[];

  public filters: boolean = false;

  // style triggers
  public hover_filter_button: boolean = false;

  constructor(
  ) { }

  ngOnInit() {
  }

  /**
   * 
   */
  public toggleFilter(): void {
    this.filters = !this.filters;
  }
}
