import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Media } from "@app/shared/models/media.model";

@Component({
    selector: "app-media-view",
    imports: [CommonModule],
    templateUrl: "./media-dialog.component.html",
})
export class MediaDialogComponent {
    @Input() media?: Media = new Media();

    getVideoType(): string {
        const extension = this.media?.path?.split(".").pop()?.toLowerCase() || "";
        return `video/${extension}`;
    }

    getAudioType(): string {
        const extension = this.media?.path?.split(".").pop()?.toLowerCase() || "";
        return `audio/${extension}`;
    }
}
