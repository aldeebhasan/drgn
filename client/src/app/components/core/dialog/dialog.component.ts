import { CommonModule, NgComponentOutlet } from "@angular/common";
import { Component, ComponentRef, ElementRef, HostListener, OnDestroy, ViewChild, ViewContainerRef } from "@angular/core";
import { IconComponent } from "../icon/icon.component";
import { DialogService } from "@app/services/dialog.service";

@Component({
    selector: "app-dialog",
    imports: [CommonModule, IconComponent, NgComponentOutlet],
    templateUrl: "./dialog.component.html",
    styleUrl: "./dialog.component.css",
})
export class DialogComponent implements OnDestroy {
    showDialog: boolean = true;
    public childComponent: any;
    public inputs: Record<string, unknown> = {};

    constructor(private dialogService: DialogService) {
        this.dialogService.currentDialogState.subscribe((state) => {
            this.showDialog = state.show;
            this.childComponent = state.component;
            this.inputs = state.inputs || {};
        });
    }

    // Close dialog when clicking outside content
    @HostListener("document:click", ["$event"])
    onClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (target.classList.contains("dialog-overlay")) {
            this.close();
        }
    }

    // Close dialog on ESC key
    @HostListener("document:keydown.escape", ["$event"])
    onKeydownHandler() {
        this.close();
    }

    close() {
        this.showDialog = false;
    }

    ngOnDestroy() {
        this.close();
    }
}
