import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookTableComponent } from '../book-table/book-table.component';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent implements OnInit {
  ngOnInit(): void {
    this.getAuthors();
    this.getBooks();
    this.resetForm();
  }

  @Input() currentBookId!: string;
  @Input() currentBookContent!: any;

  booksList: any = [];

  authorsNamesList: any = [];
  authorsList: any = [];
  constructor(private router: Router, private http: HttpClient) {}

  // Reset form with current item content
  resetForm = () => {
    this.newBook.bookTitle = new FormControl(this.currentBookContent.title, [
      Validators.required,
    ]);
    this.newBook.bookDescription = new FormControl(
      this.currentBookContent.description,
      [Validators.required]
    );
    this.newBook.bookreleaseDate = new FormControl(
      this.currentBookContent.releaseDate,
      [Validators.required]
    );
  };
  //Retrieve authors list (name + id)
  getAuthors = () => {
    this.http.get('http://localhost:3000/authors').subscribe((snaps: any) => {
      this.authorsList = snaps;
      this.fillAuthorsNamesId();
    });
  };

  fillAuthorsNamesId = () => {
    this.authorsList.forEach((value: string, key: string) => {
      this.authorsNamesList.push({
        name: this.authorsList[key].name,
        _id: this.authorsList[key]._id,
      });
    });
  };

  //Getting current book items for delete
  hello = '';
  newBook = {
    bookTitle: new FormControl(this.hello, [Validators.required]),
    bookDescription: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
    bookreleaseDate: new FormControl('', [Validators.required]),
    authorId: new FormControl(''),
  };

  getBooks = () => {
    this.http.get('http://localhost:3000/books').subscribe((snaps: any) => {
      this.booksList = snaps;
    });
  };

  updateBook(booktId: any) {
    console.log(this.newBook.authorId.value);
    this.http
      .patch(`http://localhost:3000/books/${booktId}`, {
        title: this.newBook.bookTitle.value,
        description: this.newBook.bookDescription.value,
        releaseDate: this.newBook.bookreleaseDate.value,
        authorId: this.newBook.authorId.value,
      })
      .subscribe((snaps: any) => {
        this.getBooks();
      });
    alert('Book updated succefully');
    this.reloadCurrentPage();
  }

  reloadCurrentPage = () => {
    window.location.reload();
  };
}
