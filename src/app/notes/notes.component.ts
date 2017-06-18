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

    CONFIG_NAME = 'myConfig';

    notes: Array<Note> = [];
    selectedNote: Note;
    notesConfig: NotesConfig = new NotesConfig();

    closeResult: string;

    constructor(private modalService: NgbModal, private notesService: NotesService) {
        console.log('Create NotesComponent');
    }

    ngOnInit(): void {

        console.log('init');
        this.configLoad()
            .then(() => this.searchNotes())
            .catch(() => this.searchNotes());

    }

    private configLoad() {
        return this.notesService.configLoad(this.CONFIG_NAME).then(doc => {
            this.notesConfig = doc;
        }).catch(() => {
            this.notesConfig = new NotesConfig();
            this.notesConfig.searchtext = '';
            this.notesConfig._id = this.CONFIG_NAME;
        });
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

    searchNotes() {
        this.configSave();

        this.notesService.findText(this.notesConfig.searchtext)
            .then(notesFound => this.notes = notesFound)
            .catch(error => console.error(error));
    }

    private configSave() {
        this.notesService.configSave(this.notesConfig).then(() =>
            this.notesService.configLoad(this.CONFIG_NAME).then(doc => {
                this.notesConfig = doc;
            }).catch(() => {
                this.notesConfig = new NotesConfig();
                this.notesConfig.searchtext = '';
                this.notesConfig._id = this.CONFIG_NAME;
            })
        );
    }

    openDialog() {

        this.modalService.open(this.dialog, {size: 'lg'}).result.then((result) => {
            console.log(result);
            if (result === 'Ok') {
                this.noteUpdate(this.selectedNote);
            }
        }, (reason) => {
            // Save always, oven on cancel
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
            myThis.searchNotes();
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
