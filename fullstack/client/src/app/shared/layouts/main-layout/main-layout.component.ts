import {Component,OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces";

@Component({
  selector: 'app-guest-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  currentUser!:User
  currentUserEmail:string = ''
  constructor(
    protected auth: AuthService,
    private userService:UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.currentUser = this.userService.getAuthenticatedCurrentUser()

    this.currentUserEmail = this.currentUser?.email
  }
  logout(event: Event) {
    event.preventDefault()

    const decision = window.confirm(`Do you want to logout`)
    if (decision) {

      this.auth.logout()
      this.router.navigate(['/'])
    }
  }

}
