import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { Tag } from '../tag';

@Component({
  providers: [StorageService],
  selector: 'app-tags',
  standalone: true,
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})

export class TagsComponent {
  loaded = false;
  tags : Tag[] = [];
  constructor(private storageService: StorageService) {
    this.loadTags();
  }


  loadTags():void {
      if(!this.loaded){
        this.tags = this.storageService.getTags();
        this.loaded = true;
      }else{
        
    }  
  }

    dialogAddTag():void {
      console.log("Dialog Add Tag");
    const tagName = window.prompt("Enter tag name:");
    if (tagName != null) {
      const tagColor = window.prompt("Enter tag color:");
      if (tagColor != null) {
        this.tags.push({ id: this.tags.length + 1, name: tagName, color: tagColor });
      }
    }
  }

}
