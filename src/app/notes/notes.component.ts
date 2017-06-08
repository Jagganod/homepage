import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Note} from './entities/note';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {isUndefined} from 'util';
import {NotesService} from './notes.service';
import {NotesConfig} from './entities/notesconfig';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnChanges {

    @ViewChild('noteDialog') dialog: ElementRef;

    notes: Array<Note> = [];
    selectedNote: Note;
    notesConfig: NotesConfig = new NotesConfig();

    closeResult: string;

    constructor(private modalService: NgbModal, private notesService: NotesService) {
        console.log('ctor');

    }

    ngOnInit(): void {
        console.log('init');

        const CONFIG_NAME = 'myConfig';

        this.notesService.configLoad(CONFIG_NAME).then(doc => {
            this.notesConfig = doc;
            this.loadAllNotes();
        }).catch(result => {
            this.notesConfig = new NotesConfig();
            this.notesConfig.searchtext = '';
            this.notesConfig._id = CONFIG_NAME;
            this.loadAllNotes();
        });

    }

    private loadAllNotes() {
        const search = this.notesConfig.searchtext.toLowerCase().trim();
        this.notesService.findAll()

            .then(allDoc => {
                this.notes = [];
                allDoc.rows.forEach(row => {
                    const doc = row.doc;
                    if (search === '' || this.contains(doc.title, search) || this.contains(doc.content, search)) {
                        this.notes.push(doc);
                    }

                });
                // this.notes = allDoc.rows;
            })
            .catch(error => console.error(error));
    }

    private contains(text: string, substring: string): boolean {
        if (isUndefined(text)) {
            return false;
        }
        return text.toLowerCase().indexOf(substring) !== -1;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['item']) {
            console.log('\titem');
        }
        if (changes['selected']) {
            console.log('\tselected');
        }

        console.log('changes');
    }

    noteAdd() {
        this.selectedNote = new Note();
        this.openDialog();
    }

    startSearch() {
        this.notesService.configSave(this.notesConfig);
        this.loadAllNotes();
    }

    openDialog() {

        this.modalService.open(this.dialog, {size: 'lg'}).result.then((result) => {
            console.log(result);
            if (result === 'Ok') {
                this.noteUpdate(this.selectedNote);
            }
        }, (reason) => {
            // Die Notiz soll immer gespeichert werden
            this.noteUpdate(this.selectedNote);
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            console.log(this.closeResult);
        });
    }

    doEdit(note: Note) {
        console.log('Edit', note);
        this.selectedNote = note;
        this.openDialog();
    }

    doDelete(note: Note) {
        this.notesService.deleteNote(note).then(result => {
            // handle result
            console.log('ok', result);

            const index = this.notes.indexOf(note, 0);
            if (index > -1) {
                this.notes.splice(index, 1);
            }

        }).catch(function (err) {
            console.log(err);
        });

    }

    private noteUpdate(note: Note) {
        if (isUndefined(note.title) && isUndefined(note.content)) {
            // New und not Edit Note
        } else if (note.title === '' && note.content === '') {
            this.doDelete(note);
        } else {
            this.noteSave(note);
        }
    }

    private noteSave(note: Note) {
        const myThis = this;
        this.notesService.noteSave(note).then(function (response) {
            console.log(response);
            myThis.loadAllNotes();
        }).catch(err => console.log(err));
    }

    private getDismissReason(reason: any): string {

        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}
