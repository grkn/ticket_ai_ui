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
  }

  addNewQuickReply() {
  this.replies.push({text: '', buttons: [] });
  }

  addNewButton(quickReply: any) {
    quickReply.buttons.push({'url': '', name: '' });
  }

  saveAnswer(i: number) {
    const selIntent = this.selectedIntent.find(t => t.index === i);
    const body = {
      intentId: selIntent.id,
      message: this.replies[i],
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

  selectIntent(targetElement: any, i: number) {
    const intent = this.intents.find(t => t.name === targetElement);
    this.selectedIntent.push({index : i, id: intent.id});
  }
}