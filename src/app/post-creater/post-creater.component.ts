import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { PostCreaterService } from './post-creater.service';

@Component({
	selector: 'app-post-creater',
	templateUrl: './post-creater.component.html',
	styleUrls: ['./post-creater.component.css'],
})
export class PostCreaterComponent implements OnInit {
	returnPost: Observable<any> | undefined;
	postForm: FormGroup;
	radioButtonValues = ['create', 'update', 'delete'];

	constructor(
		private fb: FormBuilder,
		private pcService: PostCreaterService
	) {
		this.postForm = this.fb.group({
			resttype: '',
			id: '',
			userId: '',
			title: '',
			body: '',
		});
	}

	ngOnInit(): void {
		this.postForm.valueChanges.subscribe(console.log);
		this.postForm.patchValue({ resttype: 'create' });
	}

	log(x: any) {
		console.log(x);
	}

	onSubmit() {
		const post: Post = {
			id: this.postForm.value.id == '' ? 0 : this.postForm.value.id,
			userId: Number(this.postForm.value.userId),
			title: this.postForm.value.title,
			body: this.postForm.value.body,
		};

		switch (this.postForm.value.resttype) {
			case 'create':
				this.returnPost = this.pcService.createPost(post);
				break;
			case 'update':
				this.returnPost = this.pcService.updatePostPartial(post);
				break;
			case 'delete':
				this.returnPost = this.pcService.deletePost(
					this.postForm.value.id
				);
				break;
			default:
		}
	}
}
