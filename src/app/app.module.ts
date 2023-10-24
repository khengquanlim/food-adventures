import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

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
import { ImageGridComponent } from './image-grid/image-grid.component';
import { ChatUserListComponent } from './chat-user-list/chatUserList.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    ImageGridComponent,
    ChatUserListComponent,
    NavbarComponent,
    ImageGridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
