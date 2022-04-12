import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {MainComponent} from "./main/main.component";
import {ChildOneComponent} from "./main/child-one/child-one.component";
import {ChildTwoComponent} from "./main/child-two/child-two.component";
import {SupportComponent} from "./support/support.component";
import {AuthGuard} from "./services/auth/auth.guard";
import {Routes} from "./routes";

const routes: Route[] = [
  {
    path: Routes.MAIN,
    component: MainComponent,
    children: [
      {
        path: Routes.CHILD_ONE,
        component: ChildOneComponent
      },
      {
        path: Routes.CHILD_TWO,
        component: ChildTwoComponent
      }
    ]
  },
  {
    path: Routes.SUPPORT,
    canActivate: [AuthGuard],
    component: SupportComponent,
  }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  }
)

export class AppRoutingModule {}
