import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.getStatistics();
  }

  Stats: any;
  getStatistics = () => {
    this.http
      .get('http://localhost:3000/statistics')
      .subscribe((snaps: any) => {
        this.Stats = snaps;
        console.log(this.Stats);
        // this.getAuthorsFromBooks();
      });
  };
}
