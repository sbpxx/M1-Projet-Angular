import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../note';
import { NotesService } from '../notes.service';
import { Tag } from '../tag';
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-notes',
  standalone: true,
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  imports: [CommonModule, FormsModule],
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  editing: Note | null = null;
  listTags: Tag[] = [];

  constructor(private notesService: NotesService, private tagsService: StorageService) {}

  ngOnInit(): void {
    this.loadNotes();
    this.loadTags();
  }

  loadNotes(): void {
    this.notes = this.notesService.getNotes();
  }

  loadTags(): void {
    this.listTags = this.tagsService.getTags();
  }

  startEdit(note: Note | null = null): void {
    this.editing = note ? { ...note } : { id: 0, title: '', content: '', tags: [] };
  }

  stopEdit(): void {
    this.editing = null;
  }

  saveEdit(): void {
    if (this.editing) {

      // si id = 0, c'est une nouvelle note
      if (this.editing.id === 0) {
        this.editing.id = this.notes.length + 1;
        this.notes.push(this.editing);
      } else { // sinon, on met à jour la note existante
        let index = -1;
        for (let i = 0; i < this.notes.length; i++) {
          if (this.notes[i].id === this.editing.id) {
            index = i;
          }
        }
        // Si l'index est trouvé, on met à jour la note existante
        if (index !== -1) {
          this.notes[index] = this.editing;
        }
      }
      this.notesService.saveNotes(this.notes);
      this.editing = null;
    }
  }

  deleteNote(note: Note): void {
    const index = this.notes.indexOf(note);
    if (index > -1) {
      this.notes.splice(index, 1); // Supprime la note de la liste
      this.notesService.saveNotes(this.notes);
    }
  }

  addTag(tag: Tag): void {
    if (this.editing) {
      // Vérifie si le tag existe déjà dans la note
      let alreadyHasTag = false;
      for (let n of this.editing.tags) {
        if (n.id === tag.id) {
          alreadyHasTag = true;
        }
      }
      if (!alreadyHasTag) { // Si le tag n'existe pas, on l'ajoute
        this.editing.tags.push(tag);
      } 
    }
  }


  removeTag(tag: Tag): void {
    if (this.editing) {
      let newTags = [];
      for (let n of this.editing.tags) {
        if (n.id !== tag.id) {
          newTags.push(n);
        }
      }
      this.editing.tags = newTags;
    }
  }

  isTagSelected(tag: Tag): boolean {
    if (this.editing) { // Vérifie si le tag est déjà sélectionné dans la note en cours de modification
      for (let n of this.editing.tags) {
        if (n.id === tag.id) {
          return true;
        }
      }
    }
    return false;
  }


  trackById(index: number, item: Note): number {
    return item.id;
  }

  // Vérifie si une note a des tags
  getTagsForNote(note: Note): Tag[] {
    let tagsForNote: Tag[] = [];
    for (let tag of note.tags) {
      for (let listTag of this.listTags) {
        if (listTag.id === tag.id) {
          tagsForNote.push(listTag);
        }
      }
    }
    return tagsForNote;
  }

  // Vérifie si un tag est déjà utilisé dans une note
  // afin d'afficher les tags disponibles 
  getAvailableTags(): Tag[] {
    let availableTags: Tag[] = [];
    if (this.editing) {
      for (let listTag of this.listTags) {
        let isTagUsed = false;
        for (let selectedTag of this.editing.tags) {
          if (listTag.id === selectedTag.id) {
            isTagUsed = true;
            break;
          }
        }
        if (!isTagUsed) {
          availableTags.push(listTag);
        }
      }
    } else {
      availableTags = this.listTags;
    }
    return availableTags;
  }
}
