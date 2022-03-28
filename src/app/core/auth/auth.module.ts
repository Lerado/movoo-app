import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TMDBAuthInterceptor } from './auth.interceptor';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TMDBAuthInterceptor,
            multi: true
        }
    ]
})
export class AuthModule { }
