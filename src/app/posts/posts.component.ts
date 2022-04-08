import { Component } from '@angular/core';
import { PostsService } from './posts.service';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
	posts;
	userId = '';

	constructor(private service: PostsService) {
		this.posts = this.service.getPosts();
	}

	reload() {
		console.log('Reloading');
		this.posts = this.service.getPosts(this.userId);
		console.log('Reloaded');
	}
}
