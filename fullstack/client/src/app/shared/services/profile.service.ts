import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post, User} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http:HttpClient
  ) { }

  getPostsByAuthorId():Observable<Post[]>{
    return this.http.get<Post[]>(`/api/profile`)
  }
}
