import { NgModule } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { TitleSuffixStrategy } from './title-suffix.service';

@NgModule({
    providers: [{
        provide: TitleStrategy,
        useClass: TitleSuffixStrategy
    }]
})
export class TitleSuffixModule {}
