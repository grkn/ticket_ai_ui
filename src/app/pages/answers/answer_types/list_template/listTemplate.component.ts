import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'list-template-cmp',
  templateUrl: 'listTemplate.component.html',
  styles: []
})
export class ListTemplateComponent implements OnInit {
private templates: any = [];
private http: HttpClient;
private intents: any;
private selectedIntent: any = [];

  constructor(http: HttpClient) {
  this.http = http;
  }

  ngOnInit() {
  this.fetchIntents();
  }

  addNewTemplates() {
  this.templates.push({ title: '', subtitle: '', buttons: [] });
  }

  addNewButton(template: any) {
    template.buttons.push({'url': '', name: '' });
  }

  saveAnswer(i: number) {
    const selIntent = this.selectedIntent.find(t => t.index === i);
    const body = {
      intentId: selIntent.id,
      message: this.templates[i],
      type: 'listTemplate'
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
