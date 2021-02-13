import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/_models/post';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: Post; // a post
  public likeCount: number = 10;
  public licked: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public like(): void {
    this.licked = true;
    this.likeCount++;
  }

  public unlike(): void {
    this.licked = false;
    this.likeCount--;
  }

}
