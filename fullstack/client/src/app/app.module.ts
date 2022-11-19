import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { JwtModule } from '@auth0/angular-jwt';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/layouts/main-layout/main-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {AllPostsPageComponent} from './all-posts-page/all-posts-page.component';
import {TokenInterceptor} from "./shared/clases/token.interceptor";
import { ProfileComponent } from './profile/profile.component';
import { CreateComponent } from './create/create.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginPageComponent,
    HomePageComponent,
    RegisterPageComponent,
    AllPostsPageComponent,
    ProfileComponent,
    CreateComponent,
    NotFoundComponent,
    LoaderComponent,
    DetailsComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter:  () => localStorage.getItem('token')
      }
    })
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      multi:true,
      useClass:TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
