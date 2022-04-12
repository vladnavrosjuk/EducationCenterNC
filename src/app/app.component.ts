import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {FireBaseUser} from "./services/types";
import {Router} from "@angular/router";
import {Routes} from "./routes";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public user: FireBaseUser = null;
  public routes: typeof Routes = Routes;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.authService.user$.subscribe((value: FireBaseUser) => {
      this.user = value;
      console.log(value?.displayName)
    });
  }

  public login(): void {
    this.authService.googleSignIn().subscribe();
  }

  public logout(): void {
    this.authService.signOut().subscribe(() => this.router.navigate(["/"]));
  }
}
