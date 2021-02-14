import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/Auth.service';
import { Post } from 'src/app/_models/post';
import { SocketIoService } from 'src/app/_services/io.service';
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
    private ioService: SocketIoService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.refeshPostList();

    // subscriptions
    this.subscribeToIoLikes();
    this.subscribeToIoUnLikes();
  }

  /**
   * broadcast likes to others
   * @param post the liked post
   */
  public broadcastLike(post: Post): void {
    this.ioService.sendLikeInformation(post);
  }

  /**
   * broadcast un likes to others
   * @param post the liked post
   */
  public broadcastUnLike(post: Post): void {
    this.ioService.sendUnLikeInformation(post);
  }

  /**
   * Refresh posts list
   */
  public refeshPostList(): void {
    // hide dialog
    if (this.postDialog) {
      this.postDialog = false;
    }
    // reload data
    this.postService.getAllWithHeader<Post>(
      { 'userData': JSON.stringify(this.authService.getUserData()) }
      ).subscribe(posts => {
        this.posts = posts.sort((a, b) => new Date(a.UpdatedAt).getTime() - new Date(b.UpdatedAt).getTime());;
        this.posts.reverse();
        console.log('posts', this.posts);
        this.cd.markForCheck();
      },
      err => {
        console.log('get all posts error.', err);
      }
    );
  }

  /**
   * Subscribe to likes
   */
  private subscribeToIoLikes(): void {
    this.ioService.getLikes()
    .subscribe((post: Post) => {
      // --
      let selectedPost: Post = this.posts.find(p => p.Id === post.Id);
      if (selectedPost) {
        selectedPost.likes++;
      }
    });
  }

  /**
   * Subscibe to unlikes
   */
  private subscribeToIoUnLikes(): void {
    this.ioService.getUnLikes()
    .subscribe((post: Post) => {
      // --
      let selectedPost: Post = this.posts.find(p => p.Id === post.Id);
      if (selectedPost) {
        selectedPost.likes--;
      }
    });
  }
}
