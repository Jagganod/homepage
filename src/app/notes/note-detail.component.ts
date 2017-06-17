import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Note} from './entities/note';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NotesDetailComponent {

  @Input() item: Note;
  @Output() onEdit = new EventEmitter<Note>();
  @Output() onDelete = new EventEmitter<Note>();

  saveNote() {
    this.onEdit.next(this.item);
  }

  deleteNote() {
    if (confirm('Wirlich löschen?')) {
      this.onDelete.next(this.item);
    }
  }
}
