import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { TagsComponent } from './tags/tags.component';

const routes: Routes = [
  { path: 'notes', component: NotesComponent },
  { path: 'tags', component: TagsComponent },
  { path: '', redirectTo: '/notes', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}