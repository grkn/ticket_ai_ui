import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'intents',
  moduleId: module.id,
  templateUrl: 'intent.component.html'
})

export class IntentComponent {
  private http: HttpClient;
  private intents: any;
  private intentName: String;
  private toastr: ToastrService;
  private sentences = [];
  private selectedSentences: String;
  private selectedSentenceIndex: Number;

  constructor(http: HttpClient, toastr: ToastrService) {
    this.http = http;
    this.toastr = toastr;
    this.fetchIntents();
  }

  fetchIntents() {
    this.http.get('http://localhost:8081/intents').toPromise()
      .then(response => {
        this.intents = response;
        for (let i = 0; i < this.intents.length; i++) {
          this.http.get('http://localhost:8081/utterances?intents=' + this.intents[i].name).toPromise()
            .then(resp => {
              this.intents[i]['sentences'] = resp;
            })
            .catch(e => {
              console.log(e);
            })
        }
      })
      .catch(e => {
        console.log(e);
      })
  }

  createIntent() {
    if (!this.intentName || this.intentName.trim() === '') {
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">You can not create intent without intent name.</span>',
        '',
        {
          timeOut: 4000,
          enableHtml: true,
          closeButton: true,
          toastClass: 'alert alert-danger alert-with-icon',
          positionClass: 'toast-' + 'top' + '-' + 'center'
        }
      );
    } else {
      this.http.post('http://localhost:8081/intent', {intentName: this.intentName}).toPromise()
        .then(response => {
          response['sentences'] = [];
          this.intents.push(response);
        })
        .catch(e => {
          console.log(e);
        })
    }
  }

  deleteIntent(intentName: String) {
    this.http.delete('http://localhost:8081/intent?intentName=' + intentName).toPromise()
      .then((response: any) => {
        this.intents = this.intents.filter(item => item.name !== response.deleted);
      })
      .catch(e => {
        console.log(e);
      })
  }

  addUtterance(iName: String, index: any) {
    if (!this.sentences[index] || this.sentences[index].trim() === '') {
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">You can not add sentence without sentence name.</span>',
        '',
        {
          timeOut: 4000,
          enableHtml: true,
          closeButton: true,
          toastClass: 'alert alert-danger alert-with-icon',
          positionClass: 'toast-' + 'top' + '-' + 'center'
        }
      );
    } else {
      this.http.post('http://localhost:8081/utterances', {intentName: iName, text: this.sentences[index]})
        .toPromise()
        .then((response: any) => {
          if (response.sent) {
            this.toastr.success(
              '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">The sentence is learned by AI</span>',
              '',
              {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: 'alert alert-success alert-with-icon',
                positionClass: 'toast-' + 'top' + '-' + 'center'
              });
            this.intents[index]['sentences'].push({'text': this.sentences[index]});
          }
        })
        .catch(e => {
          console.log(e);
        })
    }
  }

  selectSentence(sentence: String, index: Number) {
    this.selectedSentences = sentence;
    this.selectedSentenceIndex = index;
  }

  deleteUtterance(index) {
    if (this.selectedSentences && this.selectedSentences.trim() !== '' && this.selectedSentenceIndex === index) {
      this.http.delete('http://localhost:8081/utterances?text=' + this.selectedSentences).toPromise()
        .then((response: any) => {
          this.intents[index].sentences = this.intents[index].sentences.filter(item => item.text !== this.selectedSentences);
        })
        .catch(e => {
          console.log(e);
        })
    }
  }

  filterIntents(value: String) {
    this.intents.forEach(item => {
      item.visible = item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    this.intents.sort((a, b) => a.visible ? -1 : b.visible ? 1 : 0);
  }
}
