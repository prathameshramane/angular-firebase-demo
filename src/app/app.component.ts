import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses$: Observable<any[]>;
  author$: Observable<any>;

  constructor(db: AngularFireDatabase) {
    this.courses$ = db.list("/courses").valueChanges();
    this.author$ = db.object("/authors/1").valueChanges();
  }
}
