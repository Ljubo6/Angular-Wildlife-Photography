import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Message, Post} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
  create(postData: Post):Observable<Post>{
    return this.http.post<Post>('/api/post',postData)
  }
  edit(id:string,postData: Post):Observable<Post>{
    return this.http.patch<Post>(`/api/post/${id}`,postData)
  }
  getById(id:string):Observable<Post>{
    return this.http.get<Post>(`/api/post/${id}`)
  }
  delete(id: string):Observable<Message>{
    return this.http.delete<Message>(`/api/post/${id}`)
  }
  like(id:string):Observable<Post>{
    return this.http.post<Post>(`/api/post/like/${id}`,null)
  }
  dislike(id:string):Observable<Post>{
    return this.http.post<Post>(`/api/post/dislike/${id}`,null)
  }
  details(id:string):Observable<Post>{
    return this.http.get<Post>(`/api/post/details/${id}`)
  }
  detailsGuest(id:string):Observable<Post>{
    return this.http.get<Post>(`/api/post/detailsGuest/${id}`)
  }
}
