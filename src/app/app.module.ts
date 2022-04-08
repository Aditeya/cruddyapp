import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreaterComponent } from './post-creater/post-creater.component';
import { PostCreaterService } from './post-creater/post-creater.service';
import { PostsComponent } from './posts/posts.component';
import { PostsService } from './posts/posts.service';

@NgModule({
	declarations: [AppComponent, PostsComponent, PostCreaterComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
	],
	providers: [PostsService, PostCreaterService],
	bootstrap: [AppComponent],
})
export class AppModule {}
