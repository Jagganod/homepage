import {Component, OnInit} from '@angular/core';
import {KfzSearchService} from './kfz-search.service';
import {Kfz} from './kfz';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {SearchType} from './kfz.enum';


class SearchTypeClass {
    text: string;
    type: SearchType;
}

@Component({
    selector: 'app-kfz',
    templateUrl: './kfz.component.html',
    styleUrls: ['./kfz.component.css']
})
export class KfzComponent {

    kfzList: Observable<Kfz[]> = Observable.of<Kfz[]>([]);
    searchTerm = '';

    searchBy: SearchTypeClass[] = [
        {text: 'Kennzeichen', type: SearchType.USZ},
        {text: 'Stadt/Landkreis', type: SearchType.STAKR},
        {text: 'Alles', type: SearchType.BOTH}
    ];

    searchBySelected: SearchTypeClass = this.searchBy[0];

    constructor(private kfzSearchService: KfzSearchService) {
    }

    search(): void {
        const search = this.searchTerm.trim();
        this.kfzList = search
            ? this.kfzSearchService.search(search, this.searchBySelected.type)
            : Observable.of<Kfz[]>([]);

    }

    select(searchType: SearchTypeClass): void {
        this.searchBySelected = searchType;
        this.search();
    }

    // private find(searchArt: SearchType) {
    //     return this.searchBy.find( item => item.type === searchArt);
    // }

}
