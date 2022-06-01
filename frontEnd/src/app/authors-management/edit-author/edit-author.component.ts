import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.scss'],
})
export class EditAuthorComponent implements OnInit {
  ngOnInit(): void {
    this.getBooks();
    this.resetForm();
  }

  @Input() currentAuthorId!: string;
  @Input() currentAuthorContent!: any;

  booksList: any = [];

  booksNamesList: any = [];
  authorsList: any = [];
  constructor(private router: Router, private http: HttpClient) {}

  resetForm = () => {
    this.newAuthor.authorDescription = new FormControl(
      this.currentAuthorContent.description,
      [Validators.required]
    );
    this.newAuthor.authorAge = new FormControl(this.currentAuthorContent.age, [
      Validators.required,
    ]);
    this.newAuthor.authorName = new FormControl(
      this.currentAuthorContent.name,
      [Validators.required]
    );
  };

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

  updateAuthor(authorId: any) {
    this.http
      .patch(`http://localhost:3000/authors/${authorId}`, {
        name: this.newAuthor.authorName.value,
        description: this.newAuthor.authorDescription.value,
        age: this.newAuthor.authorAge.value,
      })
      .subscribe((snaps: any) => {
        this.getAuthors();
      });

    alert('Author updated succefully');
    this.reloadCurrentPage();
  }

  reloadCurrentPage = () => {
    window.location.reload();
  };
}
