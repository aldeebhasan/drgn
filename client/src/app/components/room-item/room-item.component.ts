import { Component, Input } from "@angular/core";
import { Room } from "../../shared/models/room.model";
import { IconComponent } from "../icon/icon.component";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-room-item",
    imports: [IconComponent],
    templateUrl: "./room-item.component.html",
})
export class RoomItemComponent {
    @Input() room: Room;
}
