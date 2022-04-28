import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import firebase from "firebase/compat/app";
import {Observable} from "rxjs";
import {Collections} from '../services/crud/collections';
import {CrudService} from '../services/crud/crud.service';
import {AuthService} from "../services/auth/auth.service";
import {User, UserStore} from "../services/types";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserControls} from "../models/controls.enum";
import DocumentReference = firebase.firestore.DocumentReference;
import {StoreService} from "../services/crud/store.service";

@Component({
  selector: 'app-support',
  templateUrl: 'support.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['support.component.css']
})
export class SupportComponent implements OnInit {

  public users: Observable<UserStore[]> = this.crudService.handleData<UserStore>(Collections.USERS);

  public myForm: FormGroup = new FormGroup({});

  public data: UserStore[] = [];


  public formControls: typeof UserControls = UserControls;

  constructor(private authService: AuthService,
              private storeService: StoreService,
              private crudService: CrudService) {
  }

  public ngOnInit() {
    this.crudService.handleData<UserStore>(Collections.USERS).subscribe((value: UserStore[]) => {
      this.data = value;
      this.storeService.user = this.data[0];
    })
    this.myForm.valueChanges.subscribe(value => console.log(value));
    this.myForm.addControl(UserControls.name, new FormControl("", Validators.required));
    this.myForm.addControl(UserControls.surname, new FormControl("Test", Validators.required));
    this.myForm.addControl(UserControls.email, new FormControl("", Validators.compose([Validators.required, Validators.email])));
  }

  public submitForm(): void {
    if (this.myForm.valid) {
      const user: User = {
        name: this.myForm?.controls[UserControls.name].value,
        surname: this.myForm?.controls[UserControls.surname].value,
        email: this.myForm?.controls[UserControls.email].value
      }
      this.addUser(user);
      this.myForm?.reset();
    } else {
      alert("Error")
    }
  }

  public addUser(user: User): void {
    this.crudService.createObject(Collections.USERS, user).subscribe((value: DocumentReference<User>) => console.log(value));
  }

  public getInfo(id: string): void {
    this.crudService.getUserDoc<User>(Collections.USERS, id).subscribe(((user: User | undefined) => {
          if (user) {
            user.isLike = !user.isLike;
            const userStore: UserStore = {...user, id};
            this.update(userStore);

            this.myForm.controls[this.formControls.name].setValue(user.name);
            this.myForm.controls[this.formControls.surname].setValue(user.surname);
            this.myForm.controls[this.formControls.email].setValue(user.email);
          }
        }
      )
    );
  }

  public delete(id: string): void {
    this.crudService.deleteObject(Collections.USERS, id).subscribe();
  }

  public update(user: UserStore): void {
    if (user) {
      this.crudService.updateObject(Collections.USERS, user?.id, user).subscribe();
    }
  }

  public isControlValid(controlName: string): boolean {
    const control: AbstractControl | undefined = this.myForm?.controls[controlName];
    if (control) {
      return control.invalid && (control.dirty || control.touched);
    } else {
      return false;
    }
  }

}
