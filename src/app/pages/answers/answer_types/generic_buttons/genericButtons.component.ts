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
  this.fetchAnswers();
  }

  addNewGenericButtons() {
  this.genericButtons.push({ message : {text: '', buttons: [] }, id : '', selectedIntent : {id: ''}});
  }

  addNewButton(genericButton: any) {
    genericButton.buttons.push({'url': '', name: '', text: '' });
  }

  saveAnswer(i: number) {
    const selIntent = this.selectedIntent.find(t => t.index === i);
    const body = {
      intentId: selIntent.id,
      intentName: selIntent.name,
      message: this.genericButtons[i].message,
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

  fetchAnswers() {
    this.http.get('http://localhost:8081/answers/genericButtons').toPromise()
      .then(response => {
        // tslint:disable-next-line:forin
        for (const value in response) {
          // tslint:disable-next-line:max-line-length
          this.genericButtons.push({ message : response[value]['message'], id: response[value]['_id'], selectedIntent : {id : response[value]['intentId']}});
        }
      })
      .catch(e => {
        console.log(e);
      })
  }

  selectIntent(targetElement: any, i: number) {
    const intent = this.intents.find(t => t.name === targetElement);
    this.selectedIntent.push({index : i, id: intent.id, name: targetElement});
    this.genericButtons[i]['selectedIntent'] = {index : i, id: intent.id, name: targetElement};
  }

  deleteAnswer(gen_id: any) {
    this.http.delete('http://localhost:8081/answers/' + gen_id).toPromise()
      .then((response: any) => {
        this.genericButtons = this.genericButtons.filter(item => item.id !== gen_id);
      })
      .catch(e => {
        console.log(e);
      })
  }
}
