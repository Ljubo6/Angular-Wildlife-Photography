import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../shared/services/post.service";
import {Post} from "../shared/interfaces";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('input') inputRef!:ElementRef
  form!: FormGroup
  imagePreview!: string | ArrayBuffer | null | undefined
  error:String = ''
  success:String = ''
  post!:Post
  constructor(
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
      imageUrl: new FormControl(null,[Validators.required,Validators.pattern(urlRegex)]),
      description: new FormControl(null,[Validators.required,Validators.minLength(8)])
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
    obs$ = this.postService.create(postData)
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
