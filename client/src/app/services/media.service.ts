import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Media } from '../shared/models/media.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private showDialogSource = new BehaviorSubject<{ show: boolean, media?: Media }>({
    show: false,
    media: undefined,
  });

  currentDialogState = this.showDialogSource.asObservable();

  openMediaDialog(media: Media) {
    this.showDialogSource.next({
      show: true,
      media: media,
    });
  }

  closeMediaDialog() {
    this.showDialogSource.next({
      show: false,
      media: undefined,
    });
  }
}