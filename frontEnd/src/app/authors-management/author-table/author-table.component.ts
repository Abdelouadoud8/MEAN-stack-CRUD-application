import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

interface Author {
  icon: string;
  name: string;
  description: string;
  age: number;
  book: string;
}

@Component({
  selector: 'author-table',
  templateUrl: './author-table.component.html',
})
export class AuthorTableComponent {
  authorsList: any = [];
  display = false;
  currentAuthorId = '';
  currentAuthorContent = {};

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors = () => {
    this.http.get('http://localhost:3000/authors').subscribe((snaps: any) => {
      this.authorsList = snaps;
    });
  };

  removeAuthor(authorId: any) {
    this.http
      .delete(`http://localhost:3000/authors/${authorId}`)
      .subscribe((snaps: any) => {
        this.getAuthors();
      });
    alert('Author deleted succefully');

    this.reloadCurrentPage();
  }

  currentId = '';
  openEditForm(author: any) {
    this.onPress();
    this.currentAuthorContent = author;
    this.currentId = author._id;
    console.log(this.currentAuthorContent);
  }

  onPress() {
    this.display = !this.display;
  }

  reloadCurrentPage = () => {
    window.location.reload();
  };
}
