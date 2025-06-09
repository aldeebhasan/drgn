import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ResponseDto } from "../dtos/response.dto";
import { environment } from "../../../environments/environment";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const router = this.injector.get(Router);
    const toastrService = this.injector.get(ToastrService);

    if (!environment.production) {
      console.error("Error:", error);
    }
    if (error instanceof HttpErrorResponse) {
      const responseDto = error.error as ResponseDto<void>;
      if (error.status === 422) {
        toastrService.error(
          Object.values(responseDto.errors).join(", "),
          responseDto.message
        );
      } else {
        toastrService.error(responseDto.message);
      }
    } else {
      toastrService.error("Something went wrong; please try again later.");
    }
  }
}
