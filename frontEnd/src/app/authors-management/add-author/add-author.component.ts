import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss'],
})
export class AddAuthorComponent implements OnInit {
  ngOnInit(): void {
    this.getBooks();
  }

  booksList: any = [];

  booksNamesList: any = [];
  authorsList: any = [];
  constructor(private router: Router, private http: HttpClient) {}

  fillNames = () => {
    this.booksList.forEach((value: string, key: string) => {
      console.log(this.authorsList[key]);
      this.booksNamesList.push(this.booksList[key].title);
    });
  };

  getBooks = () => {
    this.http.get('http://localhost:3000/books').subscribe((snaps: any) => {
      this.booksList = snaps;
      this.fillNames();
    });
  };

  newAuthor = {
    authorName: new FormControl('', [Validators.required]),
    authorDescription: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
    authorAge: new FormControl('', [Validators.required]),
  };

  getAuthors = () => {
    this.http.get('http://localhost:3000/authors').subscribe((snaps: any) => {
      this.authorsList = snaps;
    });
  };

  AddAuthor() {
    this.http
      .post(`http://localhost:3000/authors`, {
        name: this.newAuthor.authorName.value,
        description: this.newAuthor.authorDescription.value,
        age: this.newAuthor.authorAge.value,
      })
      .subscribe((snaps: any) => {
        this.getBooks();
      });
    alert('Author created succefully');
    this.reloadCurrentPage();
  }

  reloadCurrentPage = () => {
    window.location.reload();
  };
}
