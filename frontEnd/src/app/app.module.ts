import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookTableComponent } from './books-management/book-table/book-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookDetailsComponent } from './books-management/book-details/book-details.component';
import { BooksListComponent } from './books-management/books-list/books-list.component';
import { AuthorListComponent } from './authors-management/author-list/author-list.component';
import { AuthorTableComponent } from './authors-management/author-table/author-table.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { AddBookComponent } from './books-management/add-book/add-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditBookComponent } from './books-management/edit-book/edit-book.component';
import { AddAuthorComponent } from './authors-management/add-author/add-author.component';
import { EditAuthorComponent } from './authors-management/edit-author/edit-author.component';
import { AuthorDetailsComponent } from './authors-management/author-details/author-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BookTableComponent,
    BookDetailsComponent,
    BooksListComponent,
    AuthorListComponent,
    AuthorTableComponent,
    WelcomeComponent,
    AddBookComponent,
    EditBookComponent,
    AddAuthorComponent,
    EditAuthorComponent,
    AuthorDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
