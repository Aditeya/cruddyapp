import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts;
  userId: string = '';

  constructor(private service: PostsService) { 
    this.posts = this.service.getPosts();
  }

  ngOnInit(): void {
  }
  
  reload() {
    console.log('Reloading');
    this.posts = this.service.getPosts(this.userId);
    console.log('Reloaded');
  }

}
