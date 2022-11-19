import {Component, OnInit} from '@angular/core';
import {CatalogService} from "../shared/services/catalog.service";
import {Catalog, User} from "../shared/interfaces";
import {Observable} from "rxjs";

@Component({

  selector: 'app-all-posts-page',
  templateUrl: './all-posts-page.component.html',
  styleUrls: ['./all-posts-page.component.css']

})

export class AllPostsPageComponent implements OnInit {
  user$!:Observable<User[]>
  users: User[] = []
  catalog$!: Observable<Catalog[]>
  constructor(
    private catalogService: CatalogService,
  ) {
  }

  ngOnInit(): void {
    this.catalog$ = this.catalogService.fetch()
  }

}
