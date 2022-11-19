import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Catalog} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http:HttpClient) { }

  fetch():Observable<Catalog[]>{
    return this.http.get<Catalog[]>('/api/post')
  }
}
