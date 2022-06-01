import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './books-management/add-book/add-book.component';
import { AuthorListComponent } from './authors-management/author-list/author-list.component';
import { BookDetailsComponent } from './books-management/book-details/book-details.component';
import { BooksListComponent } from './books-management/books-list/books-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddAuthorComponent } from './authors-management/add-author/add-author.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'bookdetails', component: BookDetailsComponent },
  { path: 'books', component: BooksListComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: '', component: WelcomeComponent },
  { path: 'addbook', component: AddBookComponent },
  { path: 'addauthor', component: AddAuthorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
function useNavigate() {
  throw new Error('Function not implemented.');
}
function navigateByUrl() {
  throw new Error('Function not implemented.');
}
