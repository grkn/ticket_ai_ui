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
  this.fetchAnswers();
  }

  addNewTemplates() {
  this.templates.push({message : { title: '', subtitle: '', buttons: []}, id : '', selectedIntent : {id: ''}});
  }

  addNewButton(template: any) {
    template.buttons.push({'url': '', name: '' });
  }

  saveAnswer(i: number) {
    const selIntent = this.selectedIntent.find(t => t.index === i);
    const body = {
      intentId: selIntent.id,
      intentName: selIntent.name,
      message: this.templates[i].message,
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

  fetchAnswers() {
    this.http.get('http://localhost:8081/answers/listTemplate').toPromise()
      .then(response => {
        // tslint:disable-next-line:forin
        for (const value in response) {
          this.templates.push({message : response[value]['message'], id: response[value]['_id'], selectedIntent : {id : response[value]['intentId']}});
        }
      })
      .catch(e => {
        console.log(e);
      })
  }

  selectIntent(targetElement: any, i: number) {
    const intent = this.intents.find(t => t.name === targetElement);
    this.selectedIntent.push({index : i, id: intent.id, name: targetElement});
  }

  deleteAnswer(temp_id: any) {
    this.http.delete('http://localhost:8081/answers/' + temp_id).toPromise()
      .then((response: any) => {
        this.templates = this.templates.filter(item => item.id !== temp_id);
      })
      .catch(e => {
        console.log(e);
      })
  }
}
