import { ApplicationConfig } from "@angular/core";
import { PreloadAllModules, provideRouter, withEnabledBlockingInitialNavigation, withPreloading } from "@angular/router";
import { routes } from "./app.routes";
import { provideAdvancedRouter } from "@mintplayer/ng-router";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withPreloading(PreloadAllModules), withEnabledBlockingInitialNavigation()),
        provideAdvancedRouter({ navigationDelay: 1000 })
    ]
}