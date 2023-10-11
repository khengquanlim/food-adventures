import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/component/home.component';

import { MatchesComponent } from './matches/component/matches.component';
import { ChatComponent } from './chat/component/chat.component';
import { SwipeComponent } from './swipe/component/swipe.component';
import { RecommendationComponent } from './recommendation/component/recommendation.component';
import { RegistrationComponent } from './registration/component/registration.component';
import { RestaurantOwnerProfileComponent } from './profile/restaurant-owner-profile/component/restaurant-owner-profile.component';
import { UserProfileComponent } from './profile/user-profile/component/user-profile.component';
import { LoginComponent } from './login/component/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ImageGridComponent } from './image-grid/image-grid.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserProfileComponent,
    MatchesComponent,
    ChatComponent,
    SwipeComponent,
    RecommendationComponent,
    RegistrationComponent,
    RestaurantOwnerProfileComponent,
    LoginComponent,
    NavbarComponent,
    ImageGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
