import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CastToMediaPipe } from "@app/pipes/cast-to-media.pipe";
import { CastToMessagePipe } from "@app/pipes/cast-to-message.pipe";
import { Part } from "@app/shared/models/part.model";
import { MediaService } from "@app/services/media.service";

@Component({
    selector: "app-message-part",
    imports: [CommonModule, CastToMediaPipe, CastToMessagePipe],
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
