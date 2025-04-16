import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-note',
  standalone: true,
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent {
  @Input() id!: number;
  @Input() title!: string;
  @Input() content!: string;
}
