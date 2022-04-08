import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../post';

@Injectable()
export class PostsService {
	private _url = 'https://jsonplaceholder.typicode.com/posts';

	constructor(private http: HttpClient) {}

	getPosts(userId = ''): Observable<Post[]> {
		let params = {};
		if (userId != '') params = new HttpParams().set('userId', userId);
		return this.http.get<Post[]>(this._url, { params });
	}
}
