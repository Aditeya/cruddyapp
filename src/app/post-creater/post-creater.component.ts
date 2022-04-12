import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { PostEvent } from '../postEvent';
import { PostCreaterService } from './post-creater.service';

@Component({
	selector: 'app-post-creater',
	templateUrl: './post-creater.component.html',
	styleUrls: ['./post-creater.component.css'],
})
export class PostCreaterComponent implements OnInit {
	returnPost: Observable<any> | undefined | Post;
	postSuccess = false;
	postForm: FormGroup;
	radioButtonValues = ['create', 'update', 'delete'];

	@Output() event = new EventEmitter<PostEvent>();

	constructor(
		private fb: FormBuilder,
		private pcService: PostCreaterService
	) {
		this.postForm = this.fb.group({
			resttype: '',
			id: [
				null,
				[
					Validators.required,
					Validators.pattern('[0-9]+'),
					Validators.minLength(1),
					Validators.min(1),
				],
			],
			userId: [
				null,
				[
					Validators.required,
					Validators.pattern('[0-9]+'),
					Validators.minLength(1),
					Validators.min(1),
				],
			],
			title: ['', [Validators.required, Validators.minLength(1)]],
			body: ['', [Validators.required, Validators.minLength(1)]],
		});
	}

	ngOnInit(): void {
		//this.postForm.valueChanges.subscribe(console.log);
		this.postForm.patchValue({ resttype: 'create' });
	}

	onSubmit() {
		const post: Post = {
			id: this.postForm.value.id == '' ? 0 : this.postForm.value.id,
			userId: Number(this.postForm.value.userId),
			title: this.postForm.value.title,
			body: this.postForm.value.body,
		};

		this.returnPost = undefined;
		this.postSuccess = false;
		switch (this.postForm.value.resttype) {
			case 'create':
				this.pcService.createPost(post).subscribe(d => {
					this.returnPost = d;
					this.postSuccess = true;
					this.event.emit({ post: d, action: 'create' });
				});
				break;
			case 'update':
				this.pcService.updatePostPartial(post).subscribe(d => {
					this.returnPost = d;
					this.postSuccess = true;
					this.event.emit({ post: d, action: 'update' });
				});
				break;
			case 'delete':
				this.pcService.deletePost(this.postForm.value.id);
				this.event.emit({
					id: this.postForm.value.id,
					action: 'delete',
				});
				this.postSuccess = true;
				break;
			default:
		}
	}

	isFormValid() {
		switch (this.resttype?.value) {
			case 'create':
				return (
					this.userId?.invalid ||
					this.title?.invalid ||
					this.body?.invalid
				);
			case 'update':
				return this.userId?.invalid || this.id?.invalid;
			case 'delete':
				return this.id?.invalid;
			default:
				return this.postForm.invalid;
		}
	}

	get resttype() {
		return this.postForm.get('resttype');
	}
	get userId() {
		return this.postForm.get('userId');
	}
	get id() {
		return this.postForm.get('id');
	}
	get title() {
		return this.postForm.get('title');
	}
	get body() {
		return this.postForm.get('body');
	}
}
