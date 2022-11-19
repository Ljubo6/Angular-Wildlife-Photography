import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {passwordMatch} from "../util"

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  form!: FormGroup
  aSub!: Subscription
  error: String = ''
  success: String = ''

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(6)])

  get passwordsGroup(): FormGroup{
    return this.form.controls['passwords'] as FormGroup
  }

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: new FormControl(null,[Validators.required,Validators.minLength(3)]),
      lastName: new FormControl(null,[Validators.required,Validators.minLength(5)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      passwords: new FormGroup({
        password: this.passwordControl,
        rePassword: new FormControl(null, [passwordMatch(this.passwordControl),Validators.required])
      })
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }


  onSubmit() {
    const {firstName,lastName,email,passwords} = this.form.value
    const body = {
      firstName:firstName,
      lastName:lastName,
      email:email.toLowerCase(),
      password: passwords.password
    }
    this.form.disable()
    this.aSub = this.auth.register(body).subscribe({
      next: () => {
        this.success = 'Registration comleted'
        setTimeout(() => {
          this.router.navigate(['/login'], {
            queryParams: {
              registered: true
            }
          })
        },1000)

      },
      error: (err) => {
        this.error = err.error.message
        this.form.enable()
      }
    })
    this.error = ''
    this.success = ''
  }

  shouldShowErrorControl(controlName: string, sourceGroup = this.form) {
    return sourceGroup.controls[controlName].touched
      && sourceGroup.controls[controlName].invalid
  }
}
