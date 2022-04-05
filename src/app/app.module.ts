import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostsService } from './posts/posts.service';
import { PostCreaterComponent } from './post-creater/post-creater.component';
import { PostCreaterService } from './post-creater/post-creater.service';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostCreaterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [PostsService, PostCreaterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
