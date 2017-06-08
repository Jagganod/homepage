import {Injectable, OnInit} from '@angular/core';
import * as PouchDB from 'pouchdb';
import {Note} from './entities/note';
import {isUndefined} from 'util';
import {NotesConfig} from './entities/notesconfig';

@Injectable()
export class NotesService implements OnInit {

    db: any;
    dbConfig: any;
    remoteCouch: Boolean;

    ngOnInit(): void {
        console.log('PouchDB is Init');
    }


    constructor() {
        this.db = new PouchDB('notesDB');
        this.dbConfig = new PouchDB('notesConfigDB');
        this.remoteCouch = false;
    }

    public noteSave(note: Note): any {
        if (isUndefined(note._id)) {
            note._id = new Date().toISOString();
        }
        return this.db.put(note);
    }

    public configSave(config: NotesConfig) {
        return this.dbConfig.put(config);
    }

    public configLoad(id: string) {
        return this.dbConfig.get(id);
    }

    public findAll(): any {
        const promise = this.db.allDocs({
            include_docs: true,
            attachments: true,
            descending: true
        });
        return promise;
    }

    public deleteNote(note: Note) {
        return this.db.get(note._id).then(doc => {
            return this.db.remove(doc);
        });
    }
}
