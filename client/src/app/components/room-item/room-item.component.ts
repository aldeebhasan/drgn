import { Component, Input } from "@angular/core";
import { Room } from "../../shared/models/room.model";
import { IconComponent } from "../icon/icon.component";
import { ToastrService } from "ngx-toastr";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-room-item",
    imports: [IconComponent, CommonModule],
    templateUrl: "./room-item.component.html",
})
export class RoomItemComponent {
    @Input() room: Room;
    @Input() current: boolean;
}
