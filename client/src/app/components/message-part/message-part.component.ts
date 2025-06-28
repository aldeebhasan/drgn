import { Component, Input } from "@angular/core";
import { Part } from "../../shared/models/part.model";
import { CommonModule } from "@angular/common";
import { CastToMediaPipe } from "../../pipes/cast-to-media.pipe";
import { CastToMessagePipe } from "../../pipes/cast-to-message.pipe";
import { MediaService } from "../../services/media.service";
import { IconComponent } from "../icon/icon.component";

@Component({
    selector: "app-message-part",
    imports: [CommonModule, CastToMediaPipe, CastToMessagePipe, IconComponent],
    templateUrl: "./message-part.component.html",
})
export class MessagePartComponent {
    @Input() part: Part = new Part();
    @Input() local: boolean = false;

    constructor(private mediaService: MediaService) {}

    openModal(event: Event, media: any) {
        event.stopPropagation();
        this.mediaService.openMediaDialog(media);
    }
}
