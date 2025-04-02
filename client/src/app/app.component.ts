import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MediaDialogComponent } from './components/media-dialog/media-dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MediaDialogComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
