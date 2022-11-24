import {Injectable} from '@angular/core';
import {User} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http:HttpClient,
    private auth:AuthService,
    private jwtHelper: JwtHelperService
  ) { }
  getCurrentUser():Observable<User>{
     return this.http.get<User>(`/api/user`)
  }
  getAuthenticatedCurrentUser():User{
    return this.jwtHelper.decodeToken(localStorage.getItem('auth-token')!);
  }
}
