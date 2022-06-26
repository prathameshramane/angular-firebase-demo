import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  coursesDb$: AngularFireList<any>;
  courses$: Observable<any[]>;
  author$: Observable<any>;

  constructor(db: AngularFireDatabase) {
    this.coursesDb$ = db.list("/courses");
    this.courses$ = this.coursesDb$.valueChanges();
    this.author$ = db.object("/authors/1").valueChanges();
  }

  add(course: HTMLInputElement) {
    this.coursesDb$.push({
      title: course.value,
      price: 1500,
      isLive: true,
      sections: [
        { title: "Angular Fundamentals" },
        { title: "Angular Advance" },
        { title: "Angular Firebase" },
      ]
    })
  }
}
