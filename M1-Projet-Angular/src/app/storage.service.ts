import { Injectable } from '@angular/core';
import { Tag } from './tag';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage = "tags";

  constructor(private localStorageService: LocalStorageService) {}

  saveTags(tags: Tag[]): void {
    this.localStorageService.setItem(this.storage, JSON.stringify(tags));
  }

  getTags(): Tag[] {
    const storedTags = this.localStorageService.getItem(this.storage);
    return storedTags ? JSON.parse(storedTags) as Tag[] : [];
  }

  addTag(tag: Tag): void {
    const tags = this.getTags();
    tags.push(tag);
    this.saveTags(tags);
  }

  deleteTag(tag: Tag): void {
    let tags = this.getTags();
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].id === tag.id) {
        tags.splice(i, 1);
        break;
      }
    }
    this.saveTags(tags);
  }

  editTag(tag: Tag): void {
    let tags = this.getTags();
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].id === tag.id) {
        tags[i] = tag;
        break;
      }
    }
    this.saveTags(tags);
  }
}
