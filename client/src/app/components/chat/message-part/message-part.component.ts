import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CastToMediaPipe } from "@app/pipes/cast-to-media.pipe";
import { CastToMessagePipe } from "@app/pipes/cast-to-message.pipe";
import { Part } from "@app/shared/models/part.model";
import { DialogService } from "@app/services/dialog.service";
import { MediaDialogComponent } from "../media-dialog/media-dialog.component";

@Component({
    selector: "app-message-part",
    imports: [CommonModule, CastToMediaPipe, CastToMessagePipe],
    templateUrl: "./message-part.component.html",
})
export class MessagePartComponent {
    @Input() part: Part = new Part();
    @Input() local: boolean = false;

    constructor(private dialogService: DialogService) {}

    openModal(event: Event, media: any) {
        event.stopPropagation();
        this.dialogService.open(MediaDialogComponent, {
            media: media,
        });
    }
}
