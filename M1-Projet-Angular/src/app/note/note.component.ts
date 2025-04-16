import { Component, input } from '@angular/core';

@Component({
  selector: 'app-note',
  standalone: true,
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent {
  id = input<number>(0);
  title =input<string>("");
  content= input <string>(""); 
}
