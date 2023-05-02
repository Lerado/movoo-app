import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { MultiSearchBarResultMovieComponent } from "./multi-search-bar-result-movie/multi-search-bar-result-movie.component";
import { MultiSearchBarResultPersonComponent } from "./multi-search-bar-result-person/multi-search-bar-result-person.component";
import { MultiSearchBarResultComponent } from "./multi-search-bar-result.component";

@NgModule({
    declarations: [
        MultiSearchBarResultComponent,
        MultiSearchBarResultMovieComponent,
        MultiSearchBarResultPersonComponent,
    ],
    imports: [
        RouterModule,
        MatIconModule,
        MatTooltipModule,
        SharedModule
    ],
    exports: [
        MultiSearchBarResultComponent
    ]
})
export class MultiSearchBarResultModule {}
