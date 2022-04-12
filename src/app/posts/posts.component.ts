import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { Post } from '../post';
import { PostEvent } from '../postEvent';
import { PostsService } from './posts.service';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnChanges {
	posts: Post[];
	userId = '';

	@Input() event: PostEvent;

	constructor(private service: PostsService) {
		this.posts = [];
		this.event = {
			id: 0,
			action: '',
		};
	}

	ngOnInit(): void {
		this.service.getPosts().subscribe(posts => {
			this.posts = posts;
			for (let i = 0; i < this.posts.length; i++) {
				this.posts[i].visible = true;
			}
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		const currentValue = changes['event'].currentValue;
		switch (currentValue.action) {
			case 'create':
				currentValue.post.visible = true;
				this.posts.push(currentValue.post);
				break;
			case 'update':
				currentValue.post.visible = true;
				this.posts = this.posts.map(d => {
					if (d.id == currentValue.post.id) return currentValue.post;
					return d;
				});
				break;
			case 'delete':
				this.posts = this.posts.filter(
					d => Number(d.id) !== Number(currentValue.id)
				);
				break;
			default:
		}
	}

	filter() {
		if (!this.userId)
			for (let i = 0; i < this.posts.length; i++)
				this.posts[i].visible = true;
		else
			this.posts = this.posts.map(d => {
				d.visible = d.userId === Number(this.userId);
				return d;
			});
	}
}
