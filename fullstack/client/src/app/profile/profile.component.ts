import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../shared/interfaces";
import {ProfileService} from "../shared/services/profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  posts$!: Observable<Post[]>
  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.posts$ = this.profileService.getPostsByAuthorId()
  }

}
