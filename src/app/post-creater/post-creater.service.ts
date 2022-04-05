import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "../post";

@Injectable()
export class PostCreaterService {
    private _url = 'https://jsonplaceholder.typicode.com/posts';

    constructor(private http: HttpClient) { }

    createPost(data: Post) {
        return this.http.post<Post>(this._url, data);
    }

    updatePostFull(data: Post) {
        return this.http.put<Post>(this._url + '/' + data.id, data);
    }

    updatePostPartial(data: Post) {
        return this.http.patch<Post>(this._url + '/' + data.id, data);
    }
    
    deletePost(id: number) {
        return this.http.delete(this._url + '/' + id);
    }
}