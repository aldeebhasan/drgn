import {
  ApplicationConfig,
  ErrorHandler,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideToastr } from "ngx-toastr";
import { GlobalErrorHandler } from "./shared/handlers/error-handler.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
};
