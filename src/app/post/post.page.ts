import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  constructor(private authService: AuthService, private router: Router,) { }

  ngOnInit() {
    if (!this.authService.isAthenticated()){
      this.router.navigate(['/login']); // if not authenticated, return to login page
    }
  }

}
