import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  courses: any;
  subscription: Subscription;

  constructor(db: AngularFireDatabase) {
    this.subscription = db.list("/courses").valueChanges().subscribe(courses => {
      this.courses = courses;
      console.log(this.courses);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
