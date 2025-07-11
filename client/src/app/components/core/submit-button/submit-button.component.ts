import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: "app-submit-button",
    imports: [CommonModule],
    templateUrl: "./submit-button.component.html",
})
export class SubmitButtonComponent {
    @Input() title: string;
    @Input() loading: boolean = false;
    @Input() hint: string;
}
