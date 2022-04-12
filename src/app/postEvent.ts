import { Post } from './post';

export interface PostEvent {
	id?: number;
	post?: Post;
	action: string;
}
