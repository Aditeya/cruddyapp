import { Component } from '@angular/core';
import { Post } from '../post';
import { PostsService } from './posts.service';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
	posts: Post[];
	userId = '';

	constructor(private service: PostsService) {
		//this.posts = this.service.getPosts();
		this.posts = [];
	}

	ngOnInit() {
		this.service.getPosts().subscribe(posts => {
			this.posts = posts;
		});
	}

	reload() {
		//this.posts = this.service.getPosts(this.userId);
		this.service.getPosts(this.userId).subscribe(posts => {
			this.posts = posts;
		});
	}
}
