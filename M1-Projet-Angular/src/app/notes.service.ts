import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Note } from './note';
import { Tag } from './tag';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private readonly storageKey = 'notes';

  constructor(private localStorageService: LocalStorageService) {}

  getNotes(): Note[] {
    const notesJson = this.localStorageService.getItem(this.storageKey);
    return notesJson ? JSON.parse(notesJson) : [];
  }

  saveNotes(notes: Note[]): void {
    this.localStorageService.setItem(this.storageKey, JSON.stringify(notes));
  }

}
