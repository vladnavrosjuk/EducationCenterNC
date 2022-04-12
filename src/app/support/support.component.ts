import {Component} from '@angular/core';
import firebase from "firebase/compat/app";
import {Observable} from "rxjs";
import {Collections} from '../services/crud/collections';
import {CrudService} from '../services/crud/crud.service';
import {AuthService} from "../services/auth/auth.service";
import {User, UserStore} from "../services/types";
import DocumentReference = firebase.firestore.DocumentReference;

@Component({
  selector: 'app-support',
  templateUrl: 'support.component.html',
  styleUrls: ['support.component.css']
})
export class SupportComponent {

  public users: Observable<UserStore[]> = this.crudService.handleData<UserStore>(Collections.USERS);

  constructor(private authService: AuthService, private crudService: CrudService) {
  }

  public addUser(): void {
    const user: User = {
      name: "name",
      surname: "surname"
    }
    this.crudService.createObject(Collections.USERS, user).subscribe((value: DocumentReference<User>) => console.log(value));
  }

  public getInfo(id: string): void {
    this.crudService.getUserDoc<User>(Collections.USERS, id).subscribe(((value: User | undefined) => console.log(value)));
  }

  public delete(id: string): void {
    this.crudService.deleteObject(Collections.USERS, id).subscribe();
  }

  public update(id: string): void {
    const user: User = {
      name: "newname",
      surname: "newsurname"
    }
    this.crudService.updateObject(Collections.USERS, id, user).subscribe();
  }

}
