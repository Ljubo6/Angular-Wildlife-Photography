import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../shared/services/post.service";
import {Post} from "../shared/interfaces";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('input') inputRef!:ElementRef
  form!: FormGroup
  image!:File
  imagePreview!: string | ArrayBuffer | null | undefined
  error:String = ''
  success:String = ''
  post!:Post
  constructor(
    private postService: PostService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null,[Validators.required,Validators.minLength(6)]),
      keyword: new FormControl(null,[Validators.required,Validators.minLength(6)]),
      location: new FormControl(null,[Validators.required,Validators.maxLength(15)]),
      date: new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      // imageUrl: new FormControl(null,[Validators.required]),
      description: new FormControl(null,[Validators.required,Validators.minLength(8)]),
    })
  }

  onSumbit() {
    let obs$:Observable<Post>
    const postData: Post = {
      title: this.form.value.title,
      keyword: this.form.value.keyword,
      location: this.form.value.location,
      date: this.form.value.date,
      // imageUrl: this.image,
      description: this.form.value.description,
      //author: this.userService.getCurrentUser()
    }
    this.form.disable()
    obs$ = this.postService.create(postData,this.image)
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

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()
    reader.onload = () =>{
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }
}
