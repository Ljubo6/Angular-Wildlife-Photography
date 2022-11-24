import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Subscription } from 'rxjs';
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form!: FormGroup
  aSub!: Subscription
  error: String = ''
  success: String = ''
  constructor(
    private auth: AuthService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.form = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(6)])
    })
    this.route.queryParams.subscribe({
      next: (params:Params) => {
        if (params['registered']){
          //'Now you can sign in with your data'
          this.error = 'Now you can sign in with your data'
        }else if(params['accessDenied']){
          //Sign in first'
          this.error = 'Sign in first'
        }else if(params['sessionFailed']){
          this.error = 'Login,again'
        }
      }
    })
    this.error = ''
  }
  ngOnDestroy() {
    if (this.aSub){
      this.aSub.unsubscribe()
    }

  }

  onSubmit() {
    this.form.disable()

    const user = {
      email:this.form.value.email.toLowerCase(),
      password:this.form.value.password
    }

    this.aSub = this.auth.login(this.form.value).subscribe({
      next: () => {
        this.success = 'Login success'
        setTimeout(() => {
          this.router.navigate(['/'])
        },1000)
      },
      error: err => {
        console.log(err)
        this.error = err.error.message
        this.form.enable()
      }
    })
    this.success = ''
    this.error = ''
  }
}
