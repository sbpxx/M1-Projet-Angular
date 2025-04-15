import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { FormsModule } from '@angular/forms';
import { StorageService } from '../storage.service';
import { Tag } from '../tag';
import { TagComponent } from '../tag/tag.component';
import { NgModule } from '@angular/core';

@Component({
  providers: [StorageService],
  selector: 'app-tags',
  standalone: true,
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  imports: [CommonModule, FormsModule, TagComponent] 
})
export class TagsComponent {
  tags: Tag[] = [];
  editing: Tag | null = null;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    this.tags = this.storageService.getTags();
  }

  deleteTag(tag: Tag): void {
    this.storageService.deleteTag(tag);

    
    const notesString = localStorage.getItem('notes');
    let notes = [];
    if (notesString) {
      notes = JSON.parse(notesString);
    }
    // pour chaque note, supprimer le tag
    // qui correspond à l'id du tag supprimé
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      const newTags = [];
      for (let j = 0; j < note.tags.length; j++) {
        const t = note.tags[j];
        if (t.id !== tag.id) {
          newTags.push(t);
        }
      }
      note.tags = newTags;
    }

    localStorage.setItem('notes', JSON.stringify(notes));

    this.loadTags();
  }

  startEdit(tag: Tag | null = null): void {
    if (tag) {
      this.editing = { ...tag };
    } else {
      this.editing = { id: 0, name: "Tag" + (this.tags.length + 1), color: "black" };
    }
  }

  stopEdit(): void {
    this.editing = null;
  }

  saveEdit(): void {
    if (this.editing) {
      if (this.editing.id === 0) {
        let newId = 1;
        if (this.tags.length > 0) {
          let maxId = 0;
          for (let i = 0; i < this.tags.length; i++) {
            if (this.tags[i].id > maxId) {
              maxId = this.tags[i].id;
            }
          }
          newId = maxId + 1;
        }
        this.editing.id = newId;

        this.storageService.addTag(this.editing);
      } else {
        // Si le tag existe déjà, on le met à jour
        this.storageService.editTag(this.editing);

        // Mettre à jour les tags dans les notes
        this.updateNotesTags(this.editing);
      }

      // Recharger les tags pour voir les changements
      this.loadTags();

      // Arrêter le mode édition
      this.stopEdit();
    }
  }

  updateNotesTags(updatedTag: Tag): void {
    const notesString = localStorage.getItem('notes');
    let notes = [];
    if (notesString) {
      notes = JSON.parse(notesString);
    }

    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      for (let j = 0; j < note.tags.length; j++) {
        const tag = note.tags[j];
        if (tag.id === updatedTag.id) {
          note.tags[j] = updatedTag;
        }
      }
    }

    localStorage.setItem('notes', JSON.stringify(notes));
  }
}



