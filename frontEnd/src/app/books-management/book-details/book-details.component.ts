import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  bookDetails = book;
}

const book = {
  title: 'Design patterns',
  flag: '📕',
  description:
    'Hello world Hello worldHello world Hello world Hello world Hello world Hello world Hello world Hello world Hello world Hello world Hello world Hello world',
  releaseDate: new Date('2001/02/02'),
  author: 'John Smith',
};
