import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../shared/services/post.service";
import {Post} from "../shared/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @ViewChild('input') inputRef!:ElementRef
  form!: FormGroup
  imagePreview!: string | ArrayBuffer | null | undefined
  error: String = ''
  success:String = ''
  post!: Post

  constructor(
    private route:ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const urlRegex = '^https?:\\/*(?:\\w+(?::\\w+)?@)?[^\\s\\/]+(?::\\d+)?(?:\\/[\\w#!:.?+=&%@\\-\\/]*)?$'
    this.form = new FormGroup({
      title: new FormControl(null,[Validators.required,Validators.minLength(6)]),
      keyword: new FormControl(null,[Validators.required,Validators.minLength(6)]),
      location: new FormControl(null,[Validators.required,Validators.maxLength(15)]),
      date: new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      imageUrl: new FormControl(null,[Validators.required,Validators.pattern( urlRegex)]),
      description: new FormControl(null,[Validators.required,Validators.minLength(8)]),
    })
    this.route.params
      .pipe(
        switchMap(
          (params:Params) => {
            if (params['id']){
              return this.postService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe({
        next: post => {
          if (post){
            this.post = post
            this.form.patchValue({
              title: post.title,
              keyword: post.keyword,
              location: post.location,
              date: post.date,
              imageUrl: post.imageUrl,
              description: post.description

            })
            this.imagePreview = post.imageUrl
          }

          this.form.enable()
        },
        error: error => {
          this.error = error.error.message
        }
      })
  }
  get url() {
    return this.form.controls;
  }
  onSumbit() {
    let obs$:Observable<Post>
    const postData: Post = {
      title: this.form.value.title.trim(),
      keyword: this.form.value.keyword.trim(),
      location: this.form.value.location.trim(),
      date: this.form.value.date.trim(),
      imageUrl: this.form.value.imageUrl.trim(),
      description: this.form.value.description.trim(),
    }
    this.form.disable()
    obs$ = this.postService.edit(this.post._id!,postData)
    obs$.subscribe({
      next: (post) => {
        this.post = post
        this.success = 'Changes have been saved'
        this.form.enable()
        setTimeout(() => {
          this.router.navigate(['/catalog'])
        },1000)

      },
      error: error => {
        this.error = error.error.message
        this.form.enable()
      }
    })
    this.success = ''
  }

  onFileUpload(event: any) {
    this.imagePreview = this.form.value.imageUrl
  }

}
