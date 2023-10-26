import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userId: string | null;

  constructor(private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get('userId');
    console.log("this.userId", this.userId)
  }
}
