import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconComponent } from "@app/components/core/icon/icon.component";
import { Room } from "@app/shared/models/room.model";

@Component({
    selector: "app-room-item",
    imports: [IconComponent, CommonModule],
    templateUrl: "./room-item.component.html",
})
export class RoomItemComponent {
    @Input() room: Room;
    @Input() current: boolean;
}
