import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/component/login.component';
import { HomeComponent } from './home/component/home.component';
import { UserProfileComponent } from './profile/user-profile/component/user-profile.component';
import { RestaurantOwnerProfileComponent } from './profile/restaurant-owner-profile/component/restaurant-owner-profile.component';
import { ChatComponent } from './chat/component/chat.component';
import { SwipeComponent } from './swipe/component/swipe.component';
import { RegistrationComponent } from './registration/component/registration.component';
import { RecommendationComponent } from './recommendation/component/recommendation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'user-profile/:userId', component: UserProfileComponent },
  { path: 'restaurant-profile', component: RestaurantOwnerProfileComponent },
  { path: 'chat/:userId', component: ChatComponent },
  { path: 'swipe/:userId', component: SwipeComponent },
  { path: 'recommend', component: RecommendationComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
