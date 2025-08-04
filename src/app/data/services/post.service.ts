import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommentCreateDto, Post, PostComment, PostCreateDto} from "../interfaces/post.interface";
import {map, switchMap, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  http = inject(HttpClient);

  baseAPIUrl = 'https://icherniakov.ru/yt-course/';

  posts = signal<Post[]>([]);

  createPost(payload: PostCreateDto) {
    return this.http.post<Post>(`${this.baseAPIUrl}post/`, payload).pipe(
      switchMap(() => {
        return this.fetchPosts();
      })
    )
  }

  fetchPosts() {
    return this.http
      .get<Post[]>(`${this.baseAPIUrl}post/`)
      .pipe(
        tap((res) => this.posts.set(res))
      );
  }

  createComment(payload: CommentCreateDto) {
    return this.http.post<PostComment>(`${this.baseAPIUrl}comment/`, payload).pipe()
  }

  getCommentsByPostId(postId: number) {
    return this.http.get<Post>(`${this.baseAPIUrl}post/${postId}`)
      .pipe(map((res) => res.comments));
  }
}