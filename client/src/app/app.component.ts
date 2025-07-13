import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { IconComponent } from "./components/core/icon/icon.component";
import { DialogComponent } from "./components/core/dialog/dialog.component";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, IconComponent, DialogComponent],
    templateUrl: "./app.component.html",
})
export class AppComponent {}
