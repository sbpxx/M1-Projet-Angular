import { Routes } from '@angular/router';
import { TagsComponent } from './tags/tags.component';
import { NotesComponent } from './notes/notes.component';

export const routes: Routes = [
{path:"tags", component: TagsComponent},
{path:"notes", component: NotesComponent}
];


