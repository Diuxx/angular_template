import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    private postService: PostService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.refeshPostList();
  }

  /**
   * Refresh posts list
   */
  public refeshPostList(): void {

    // hide dialog
    if (this.postDialog)
    {
      this.postDialog = false;
    }
    
    // reload data
    this.postService.getAllWithHeader<Post>(
      { 'userData': JSON.stringify(this.authService.getUserData()) }
      ).subscribe(posts => {
        this.posts = posts.sort((a, b) => new Date(a.UpdatedAt).getTime() - new Date(b.UpdatedAt).getTime());;
        this.posts.reverse();
        this.cd.markForCheck();
      },
      err => {
        console.log('get all posts error.', err);
      }
    );
  }

}
