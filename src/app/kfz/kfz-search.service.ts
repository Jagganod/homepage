import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {kfzdata} from './kfzdata';


import {Kfz} from './kfz';
import {SearchType} from './kfz.enum';

@Injectable()
export class KfzSearchService {

    constructor() {
    }

    search(term: string, type: SearchType): Observable<Kfz[]> {
        const search = term.toUpperCase();
        let found: Kfz[];
        switch (type) {
            case SearchType.USZ:
                found = kfzdata.filter((value: Kfz, index, array) => value.usz.indexOf(search) !== -1);
                break;
            case SearchType.STAKR:
                found = kfzdata.filter((value: Kfz, index, array) => value.stakr.toUpperCase().indexOf(search) !== -1);
                break;
            case SearchType.BOTH:
                found = kfzdata.filter((value: Kfz, index, array) =>
                value.usz.indexOf(search) !== -1 ||
                value.stakr.toUpperCase().indexOf(search) !== -1);
                break;
            default:
                console.log('Not defined!', type);
                break;
        }

        return Observable.of<Kfz[]>(found);
    }


}
