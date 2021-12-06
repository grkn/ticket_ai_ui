import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'quick-reply-cmp',
  templateUrl: 'quickReply.component.html',
  styles: []
})
export class QuickReplyComponent implements OnInit {
private replies: any = [];
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

  addNewQuickReply() {
  this.replies.push({ message : {text: '', buttons: [] },  id : '', selectedIntent : {id: ''}});
  }

  addNewButton(quickReply: any) {
    quickReply.buttons.push({'url': '', name: '' });
  }

  saveAnswer(i: number) {
    const selIntent = this.selectedIntent.find(t => t.index === i);
    const body = {
      intentId: selIntent.id,
      intentName: selIntent.name,
      message: this.replies[i].message,
      type: 'quickReply'
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
    this.http.get('http://localhost:8081/answers/quickReply').toPromise()
      .then(response => {
        // tslint:disable-next-line:forin
        for (const value in response) {
          this.replies.push({message : response[value]['message'], id: response[value]['_id'], selectedIntent : {id : response[value]['intentId']}});
        }
      })
      .catch(e => {
        console.log(e);
      })
  }

  selectIntent(targetElement: any, i: number) {
    const intent = this.intents.find(t => t.name === targetElement);
    this.selectedIntent.push({index : i, id: intent.id, name: targetElement});
    this.replies[i]['selectedIntent'] = {index : i, id: intent.id, name: targetElement};
  }

  deleteAnswer(replies_id: any) {
    this.http.delete('http://localhost:8081/answers/' + replies_id).toPromise()
      .then((response: any) => {
        this.replies = this.replies.filter(item => item.id !== replies_id);
      })
      .catch(e => {
        console.log(e);
      })
  }
}
