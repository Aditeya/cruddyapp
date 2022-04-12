import { Component } from '@angular/core';
import { PostEvent } from './postEvent';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'cruddyapp';
	event: PostEvent = { action: '' };
}
