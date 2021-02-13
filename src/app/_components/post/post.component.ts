import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/Auth.service';
import { Post } from 'src/app/_models/post';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  // data
  public posts: Post[] = [];
  public postDialog: boolean = false;

  constructor(
    public authService: AuthService,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postService.getAllWithHeader<Post>({ 'userData': JSON.stringify(this.authService.getUserData()) }).subscribe(
      posts => {
        console.log(posts);
        this.posts = posts;
      },
      err => {
        console.log('get all posts error.', err);
      }
    );
  }

}
