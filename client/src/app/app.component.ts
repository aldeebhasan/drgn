import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MediaDialogComponent } from "./components/media-dialog/media-dialog.component";
import { IconComponent } from "./components/icon/icon.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, MediaDialogComponent, IconComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent {}
