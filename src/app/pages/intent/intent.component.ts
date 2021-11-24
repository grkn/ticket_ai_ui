import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'intents',
    moduleId: module.id,
    templateUrl: 'intent.component.html'
})

export class IntentComponent {
   private http: HttpClient;
   private intents: any;

   constructor(http: HttpClient) {
    this.http = http;
    this.fetchIntents();
   }

  fetchIntents() {
    this.http.get('http://localhost:8081/intents').toPromise()
      .then(response => {
        this.intents = response;
      })
      .catch(e => {
        console.log(e);
      })
  }

}
