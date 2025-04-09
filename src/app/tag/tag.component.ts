import { Component } from '@angular/core';
import { input } from '@angular/core';
import { Tag } from '../tag';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {
tags : Tag[] = [];
id = input<number>(0);
name = input<string>("name");
color = input<string>("color");


}
