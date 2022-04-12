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
			for (let i = 0; i < this.posts.length; i++) {
				this.posts[i].visible = true;
			}
		});
	}

	filter() {
		if (!this.userId)
			for (let i = 0; i < this.posts.length; i++)
				this.posts[i].visible = true;
		else
			this.posts = this.posts.map(d => {
				//if (d.userId !== Number(this.userId)) d.visible = false;
				d.visible = d.userId === Number(this.userId);
				return d;
			});
	}
}
