import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'generic-buttons-cmp',
  templateUrl: 'genericButtons.component.html',
  styles: []
})
export class GenericButtonsComponent implements OnInit {
private genericButtons: any = [];
private http: HttpClient;
private intents: any;
private selectedIntent: any = [];

  constructor(http: HttpClient) {
  this.http = http;
  }

  ngOnInit() {
  this.fetchIntents();
  }

  addNewGenericButtons() {
  this.genericButtons.push({text: '', buttons: [] });
  }

  addNewButton(genericButton: any) {
    genericButton.buttons.push({'url': '', name: '', text: '' });
  }

  saveAnswer(i: number) {
    const selIntent = this.selectedIntent.find(t => t.index === i);
    const body = {
      intentId: selIntent.id,
      message: this.genericButtons[i],
      type: 'genericButtons'
    };

    this.http.post('http://localhost:8081/answers', body).toPromise()
      .then(response => { console.log(response); })
      .catch(e => {
        console.log(e);
      })
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

  selectIntent(targetElement: any, i: number) {
    const intent = this.intents.find(t => t.name === targetElement);
    this.selectedIntent.push({index : i, id: intent.id});
  }
}
