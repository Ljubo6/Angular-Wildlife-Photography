import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {PostService} from "../shared/services/post.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {Post} from "../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {UserService} from "../shared/services/user.service";


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,OnDestroy {
  form!:FormGroup
  error: String = ''
  post!: Post | null
  id?:string = ''
  votes!:any
  constructor(
    public auth:AuthService,
    private userService: UserService,
    private route:ActivatedRoute,
    private postService:PostService,
    private router:Router
  ) { }

  ngOnInit(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.params
      .pipe(
        switchMap(
          (params:Params) => {

            if (params['id']){
              if (this.auth.isAuthenticated()){
                return this.postService.details(params['id'])
              }else{
                return this.postService.detailsGuest(params['id'])
              }
            }
            return of(null)
          }
        )
      )
      .subscribe({
        next: (post) => {
          if (!this.auth.isAuthenticated()){
            this.votes = post!.votes
            post!.peopleVoted = this.votes.map((x: { email: any; }) => x.email).join(' ')
          }
          this.post = post
          this.id = post?._id
        },
        error: error => {
          this.router.navigate(['/error'])
        }
      })
  }

  deletePost(event: Event) {
    event.preventDefault()
    const decision = window.confirm(`Do you want to  delete this Post "${this.post?.title}"`)
    if (decision){
      this.postService.delete(this.post?._id!)
        .subscribe({
          next: (response) => {
            this.error = response.message
          },
          error: error => {
            this.error = error.error.message
          },
          complete: () => {
            this.router.navigate(['/catalog'])
          }
        })
    }
    this.error = ''
  }

  upVotePost(event: Event) {
    this.postService.like(this.id!).subscribe({
      next:(post) => {
        this.post = post
      },
      error:(err) => {

      },
      complete:() =>{
        this.router.navigate([`/details/${this.id!}`])
      }
    })
  }
  downVotePost(event: Event) {
    this.postService.dislike(this.id!).subscribe({
      next:(post) => {
        this.post = post
      },
      error:(err) => {

      },
      complete:() =>{
        this.router.navigate([`/details/${this.id!}`])
      }
    })
  }

  ngOnDestroy(): void {

  }
}
