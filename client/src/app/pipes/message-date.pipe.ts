import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "messageDate",
})
export class MessageDatePipe implements PipeTransform {
    transform(value: string | Date | undefined): string {
        if (!value) return "";

        const date = new Date(value);
        const now = new Date();
        const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);

        // Today's messages (show time only)
        if (date.toDateString() === now.toDateString()) {
            return new DatePipe("en-US").transform(date, "h:mm a") || "";
        }
        // Yesterday's messages
        else if (diffInHours < 24) {
            return "Yesterday at " + (new DatePipe("en-US").transform(date, "h:mm a") || "");
        }
        // Within current year (show date + time)
        else if (date.getFullYear() === now.getFullYear()) {
            return new DatePipe("en-US").transform(date, "MMM d, h:mm a") || "";
        }
        // Older than current year (full date)
        else {
            return new DatePipe("en-US").transform(date, "MMM d, y, h:mm a") || "";
        }
    }
}
