import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  coursesDb$: AngularFireList<any>;
  courses: any;
  author$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.coursesDb$ = db.list("/courses");
    this.author$ = db.object("/authors/1").valueChanges();
    this.coursesDb$
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          return action.map((a: any) => ({ key: a.payload.key, ...a.payload.val() }));
        }))
      .subscribe((courses) => {
        this.courses = courses
      })

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

  update(course: any) {
    this.db.object("/courses/" + course.key)
      .update({
        title: course.title + "Updated",
        price: 1500,
        isLive: true,
        sections: [
          { title: "Angular Fundamentals " + course.key },
          { title: "Angular Advance" + course.key },
          { title: "Angular Firebase" + course.key },
        ]
      })
  }

  delete(course: any) {
    this.db.object("/courses/" + course.key)
      .remove();
  }

}
