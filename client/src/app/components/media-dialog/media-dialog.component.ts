import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Media } from '../../shared/models/media.model';
import { MediaService } from '../../services/media.service';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-media-dialog',
  imports: [CommonModule, IconComponent],
  templateUrl: './media-dialog.component.html',
  styleUrl: './media-dialog.component.css'
})
export class MediaDialogComponent {
  media?: Media = new Media();
  showDialog: boolean = false;


  constructor(private mediaService: MediaService) {
    this.mediaService.currentDialogState.subscribe(state => {
      this.showDialog = state.show;
      this.media = state.media;
    });
  }

  // Close dialog when clicking outside content
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('media-dialog-overlay')) {
      this.close();
    }
  }

  // Close dialog on ESC key
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler() {
    this.close();
  }

  close() {
    this.showDialog = false;
    this.media = undefined;
  }

  getVideoType(): string {
    const extension = this.media?.path?.split('.').pop()?.toLowerCase() || '';
    return `video/${extension}`;
  }

  getAudioType(): string {
    const extension = this.media?.path?.split('.').pop()?.toLowerCase() || '';
    return `audio/${extension}`;
  }

}
