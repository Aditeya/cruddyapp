import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { PostCreaterService } from './post-creater.service';

@Component({
  selector: 'app-post-creater',
  templateUrl: './post-creater.component.html',
  styleUrls: ['./post-creater.component.css']
})
export class PostCreaterComponent implements OnInit {
  
  returnPost: Observable<any> | undefined;
  postForm: FormGroup;
  radioButtonValues = [
    'post',
    'put',
    'patch',
    'delete'
  ];

  constructor(private fb: FormBuilder, private pcService: PostCreaterService) {
    this.postForm = this.fb.group({
      resttype: '',
      id: '',
      userId: '',
      title: '',
      body: ''
    });
  }

  ngOnInit(): void {
    this.postForm.valueChanges.subscribe(console.log);
  }
  
  log(x: any) {
    console.log(x);
  }
  
  onSubmit() {
    let post: Post = {
      id: (this.postForm.value.id == '') ? 0: this.postForm.value.id, 
      userId: Number(this.postForm.value.userId),
      title: this.postForm.value.title,
      body: this.postForm.value.body
    }

    switch(this.postForm.value.resttype) {
      case "post":
        this.returnPost = this.pcService.createPost(post);
        break;
      case "put":
        this.returnPost = this.pcService.updatePostFull(post);
        break;
      case "patch":
        this.returnPost = this.pcService.updatePostPartial(post);
        break;
      case "delete":
        this.returnPost = this.pcService.deletePost(this.postForm.value.id);
        break;
      default:
    }
  }

}
