import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'message-cmp',
  templateUrl: 'message.component.html',
  styles: []
})
export class MessageComponent implements OnInit {
  private messages: any = [];
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

  addNewMessage() {
    this.messages.push({ message : {message: ''}, id : '', selectedIntent : {id: ''}});
  }

  saveAnswer(i: number) {
    const selIntent = this.selectedIntent.find(t => t.index === i);
    const body = {
      intentId: selIntent.id,
      intentName: selIntent.name,
      message: this.messages[i].message,
      type: 'message'
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
    this.http.get('http://localhost:8081/answers/message').toPromise()
      .then(response => {
        // tslint:disable-next-line:forin
        for (const value in response) {
          this.messages.push({ message : response[value]['message'], id: response[value]['_id'], selectedIntent : {id : response[value]['intentId']}});
        }
      })
      .catch(e => {
        console.log(e);
      })
  }

  selectIntent(targetElement: any, i: number) {
    const intent = this.intents.find(t => t.name === targetElement);
    this.selectedIntent.push({index : i, id: intent.id, name: targetElement});
    this.messages[i]['selectedIntent'] = {index : i, id: intent.id, name: targetElement};
  }

  deleteAnswer(mess_id: any) {
    this.http.delete('http://localhost:8081/answers/' + mess_id).toPromise()
      .then((response: any) => {
        this.messages = this.messages.filter(item => item.id !== mess_id);
      })
      .catch(e => {
        console.log(e);
      })
  }
}
