import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire/compat';
import {AppComponent} from './app.component';
import {environment} from "../environments/environment";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {MainComponent} from './main/main.component';
import {ChildTwoComponent} from './main/child-two/child-two.component';
import {AppRoutingModule} from "./app-routing.module";
import {ChildOneComponent} from "./main/child-one/child-one.component";
import { SupportComponent } from './support/support.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ChildOneComponent,
    MainComponent,
    ChildTwoComponent,
    SupportComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
