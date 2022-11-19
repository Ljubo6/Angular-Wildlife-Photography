import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./shared/layouts/main-layout/main-layout.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {AllPostsPageComponent} from "./all-posts-page/all-posts-page.component";
import {AuthGuard} from "./shared/clases/auth.guard";
import {ProfileComponent} from "./profile/profile.component";
import {CreateComponent} from "./create/create.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {DetailsComponent} from "./details/details.component";
import {EditComponent} from "./edit/edit.component";

const routes: Routes = [
  {
    path:'',component: MainLayoutComponent,children:[
      {path:'',redirectTo:'/',pathMatch:'full'},
      {path:'',component:HomePageComponent},
      {path:'catalog',component: AllPostsPageComponent},
      {path:'details/:id',component: DetailsComponent},
      {path:'edit/:id',component: EditComponent},
      {path:'create',component: CreateComponent,canActivate: [AuthGuard]},
      {path:'profile',component: ProfileComponent,canActivate: [AuthGuard]},
      {path:'login',component: LoginPageComponent},
      {path:'register',component: RegisterPageComponent},
      {path:'**',component: NotFoundComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
