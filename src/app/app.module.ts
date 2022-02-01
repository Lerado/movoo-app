import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { CoreModule } from './core/core.module';
import { MovooModule } from '@movoo';
import { MovooConfigModule } from '@movoo/services/config';
import { appConfig } from './core/config/app.config';
import { LayoutModule } from './layout/layout.module';

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Movoo & MovooConfig
        MovooModule,
        MovooConfigModule.forRoot(appConfig),

        // Core module of your application
        CoreModule,

        // Layout module
        LayoutModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
