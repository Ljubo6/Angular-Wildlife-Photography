import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Message, Post} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
  create(postData: Post,image?:File):Observable<Post>{

    const fd = new FormData()
    if(image){
      fd.append('image',image,image.name)
    }
    fd.append('title',postData.title)
    fd.append('keyword',postData.keyword)
    fd.append('location',postData.location)
    fd.append('date',postData.date)
    fd.append('description',postData.description)
    return this.http.post<Post>('/api/post',fd)
  }
  edit(id:string,postData: Post,image?:File):Observable<Post>{

    const fd = new FormData()
    if(image){
      fd.append('image',image,image.name)
    }
    fd.append('title',postData.title)
    fd.append('keyword',postData.keyword)
    fd.append('location',postData.location)
    fd.append('date',postData.date)
    fd.append('description',postData.description)

    return this.http.patch<Post>(`/api/post/${id}`,fd)
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
