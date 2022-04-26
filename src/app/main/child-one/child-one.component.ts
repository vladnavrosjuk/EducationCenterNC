import {Component, OnInit} from '@angular/core';
import {combineLatest, takeWhile} from "rxjs";
import {UploadService} from "../../services/crud/upload.service";

@Component({
  selector: 'app-child-one',
  templateUrl: './child-one.component.html',
  styleUrls: ['./child-one.component.css']
})
export class ChildOneComponent implements OnInit {

  public imageLink: string | null = "";

  public progress: string | undefined = "";

  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
  }

  public onFileSelected(event: Event): void {
    if (event) {
      const eventTarget = (<HTMLInputElement>event?.target);
      if (eventTarget && eventTarget.files) {
        const file: File = eventTarget.files[0];
        combineLatest(this.uploadService.uploadFileAndGetMetadata('test', file))
          .pipe(
            takeWhile(([, link]) => {
              return !link;
            }, true),
          )
          .subscribe(([percent, link]) => {
            this.progress = percent;
            this.imageLink = link;
          });
      }
    }
  }

}
