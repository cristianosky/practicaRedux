import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/model/posts.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(
        'https://uniformes-op-default-rtdb.firebaseio.com/Posts.json'
      )
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  addPosts(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      'https://uniformes-op-default-rtdb.firebaseio.com/Posts.json',
      post
    );
  }

  updatePosts(posts: Post) {
    const DataUpdate = {
      [posts.id]: { title: posts.title, description: posts.description },
    };
    return this.http.patch(
      'https://uniformes-op-default-rtdb.firebaseio.com/Posts.json',
      DataUpdate
    );
  }

  deletePost(id: string) {
    return this.http.delete(
      `https://uniformes-op-default-rtdb.firebaseio.com/Posts/${id}.json`
    );
  }
}
