import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MovooLoadingInterceptor } from '@movoo/services/loading/loading.interceptor';

@NgModule({
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: MovooLoadingInterceptor,
            multi   : true
        }
    ]
})
export class MovooLoadingModule
{
}
