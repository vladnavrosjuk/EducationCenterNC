import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {FireBaseUser, UserStore} from "./services/types";
import {Router} from "@angular/router";
import {Routes} from "./routes";
import {StoreService} from "./services/crud/store.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('buttonElement')
  public button: ElementRef | undefined;

  public user: FireBaseUser = null;
  public routes: typeof Routes = Routes;
  public user$: BehaviorSubject<UserStore> = this.storeService.user$;

  constructor(private authService: AuthService,
              private storeService: StoreService,
              private router: Router) {
  }

  public ngAfterViewInit(): void {
    console.log(this.button);
  }

  public checkData(): void {
    const user: UserStore = this.storeService.user;
    if (user) {
      user.name = "newName";
      this.storeService.user = user;
    }
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
