import { Injectable } from '@angular/core';
import { Tag } from './tag';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  getTags(): Tag[] {
    return [
      { id: 1, name: 'Tag1', color: 'red' },
      { id: 2, name: 'Tag2', color: 'blue' },
      { id: 3, name: 'Tag3', color: 'green' }
    ]; // Exemple de données
  }
}
