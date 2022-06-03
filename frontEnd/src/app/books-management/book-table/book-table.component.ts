import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'book-table',
  templateUrl: './book-table.component.html',
})

//COMPONENT
export class BookTableComponent {
  booksList: any = [];
  authorsList: any = [];
  httpClient: any;
  display = false;
  displayDetails = false;

  currentBookId = '';
  currentBookContent = {};
  selectedBookDetails = {};

  newBook = {
    bookTitle: new FormControl('', [Validators.required]),
    bookDescription: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
    bookreleaseDate: new FormControl('', [Validators.required]),
  };

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks = () => {
    this.http.get('http://localhost:3000/books').subscribe((snaps: any) => {
      this.booksList = snaps;
      // this.getAuthorsFromBooks();
    });
  };

  removeBook(bookId: any) {
    this.http
      .delete(`http://localhost:3000/books/${bookId}`)
      .subscribe((snaps: any) => {
        this.getBooks();
      });
    alert('Book deleted succefully');

    this.reloadCurrentPage();
  }

  currentId = '';
  openEditForm(book: any) {
    this.onPress();
    this.currentBookContent = book;
    this.currentId = book._id;
    console.log(this.currentBookContent);
  }

  onPress() {
    this.display = true;
  }

  openBookDetails(book: any) {
    this.onPressBook();
    this.currentBookContent = book;
    this.currentId = book._id;
  }

  onPressBook() {
    this.displayDetails = true!;
  }

  onPressCloseBook() {
    this.display = false;
  }

  reloadCurrentPage = () => {
    window.location.reload();
  };
}
