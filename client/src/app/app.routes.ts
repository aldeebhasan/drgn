import { Routes } from "@angular/router";
import { RegisterComponent } from "./pages/register/register.component";
import { HomeComponent } from "./pages/home/home.component";
import { authGuard } from "./guards/auth.guard";
import { RoomComponent } from "./pages/room/room.component";
import { roomGuard } from "./guards/room.guard";

export const routes: Routes = [
    { path: "chat", component: HomeComponent, canActivate: [roomGuard] },
    { path: "room", component: RoomComponent, canActivate: [authGuard] },
    { path: "**", component: RegisterComponent },
];
