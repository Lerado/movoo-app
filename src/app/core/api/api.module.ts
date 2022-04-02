import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TMDBApiInterceptor } from './api.interceptor';

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TMDBApiInterceptor,
            multi: true
        }
    ]
})
export class ApiModule { }
