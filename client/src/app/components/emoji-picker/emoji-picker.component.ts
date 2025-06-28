import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { PickerComponent } from "@ctrl/ngx-emoji-mart";

@Component({
    selector: "app-emoji-picker",
    imports: [CommonModule, PickerComponent],
    templateUrl: "./emoji-picker.component.html",
    styleUrl: "./emoji-picker.component.css",
})
export class EmojiPickerComponent {
    @Output() emojiSelected = new EventEmitter<string>();
    showPicker = false;

    togglePicker() {
        this.showPicker = !this.showPicker;
    }

    addEmoji(event: any) {
        this.emojiSelected.emit(event.emoji.native);
        this.showPicker = false;
    }
}
