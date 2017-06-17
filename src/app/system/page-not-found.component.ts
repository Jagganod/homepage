import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

    url: Observable<string>;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.url = this.route.url.map(segments => segments.join(''));
    }

}
