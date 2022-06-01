import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  ngOnInit(): void {
    this.getAuthors();
  }

  booksList: any = [];

  authorsNamesIdList: any = [];
  authorsList: any = [];
  constructor(private router: Router, private http: HttpClient) {}

  getAuthors = () => {
    this.http.get('http://localhost:3000/authors').subscribe((snaps: any) => {
      this.authorsList = snaps;
      this.fillAuthorsNamesId();
    });
  };

  fillAuthorsNamesId = () => {
    this.authorsList.forEach((value: string, key: string) => {
      this.authorsNamesIdList.push({
        name: this.authorsList[key].name,
        _id: this.authorsList[key]._id,
      });
    });
  };

  newBook = {
    bookTitle: new FormControl('', [Validators.required]),
    bookDescription: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
    bookreleaseDate: new FormControl('', [Validators.required]),
    authorId: new FormControl('', [Validators.required]),
  };

  getBooks = () => {
    this.http.get('http://localhost:3000/books').subscribe((snaps: any) => {
      this.booksList = snaps;
    });
  };

  AddBook() {
    this.http
      .post(`http://localhost:3000/books`, {
        title: this.newBook.bookTitle.value,
        description: this.newBook.bookDescription.value,
        releaseDate: this.newBook.bookreleaseDate.value,
        authorId: this.newBook.authorId.value,
      })
      .subscribe((snaps: any) => {
        this.getBooks();
      });
    alert('Book created succefully');
    this.reloadCurrentPage();
  }

  reloadCurrentPage = () => {
    window.location.reload();
  };
}
