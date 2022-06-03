import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss'],
})
export class AuthorDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Input() selectedAuthorContent!: any;
}
