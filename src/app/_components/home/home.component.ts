import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/_models/post';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // variables
  public search: string;
  public autoCompleteResults: string[];

  constructor(
  ) { }

  ngOnInit() {

  }
}
