import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class DialogService {
    private showDialogSource = new BehaviorSubject<{ show: boolean; component?: any; inputs?: Record<string, unknown> }>({
        show: false,
        component: undefined,
        inputs: {},
    });

    currentDialogState = this.showDialogSource.asObservable();

    open(component: any, inputs: Record<string, unknown> = {}) {
        this.showDialogSource.next({
            show: true,
            component: component,
            inputs: inputs,
        });
    }

    close() {
        this.showDialogSource.next({
            show: false,
            component: undefined,
            inputs: {},
        });
    }
}
