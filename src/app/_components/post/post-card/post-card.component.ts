import { Component, Input, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core'
import { AuthService } from 'src/app/shared/services/Auth.service';
import { Like } from 'src/app/_models/like';
import { Post } from 'src/app/_models/post';
import { LikeService } from 'src/app/_services/like.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostCardComponent implements OnInit {

  @Input() post: Post; // a post

  // variables
  private userdata: any = null;

  constructor(
    private likeService: LikeService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.userdata = { 
      'userData': JSON.stringify(this.authService.getUserData()) 
    };
  }

  /**
   * Like selected Post
   */
  public like(): void {
    let like: Like = {
      PostId: this.post.Id,
      FireBaseId: this.authService.getUserData().uid
    };

    // send like
    this.likeService.postWithHeader<Like>(like, this.userdata)
    .subscribe(l => {
      console.log('liked', this.post);
      this.post.didILikeIt = l.Id; // add like id
      this.post.likes++;
    }, err => {
      console.log(err);
    });
  }

  /**
   * UnLike selected Post
   */
  public unlike(): void {
    if (!this.post.didILikeIt) {
      console.log('err, this post do not contain your like');
      return;
    }

    // remove like
    this.likeService.deleteWithHeader<Like>(this.post.didILikeIt, this.userdata)
    .subscribe(l => {
      console.log('unLiked', this.post);
      this.post.didILikeIt = null;
      this.post.likes--;
    }, err => {
      console.log(err);
    });
  }
}
