import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'carousel-cmp',
  templateUrl: 'carousel.component.html',
  styles: []
})
export class CarouselComponent implements OnInit {
  private carousels: any = [];
  private http: HttpClient;
  private intents: any;
  private selectedIntent: any = [];
  private toastr: ToastrService;


  constructor(http: HttpClient, toastr: ToastrService) {
  this.http = http;
  this.toastr = toastr;
  }

  ngOnInit() {
  this.fetchIntents();
  this.fetchAnswers();
  }

  addNewCarousel() {
  this.carousels.push({ message : [{imgUrl: '', title: '', subtitle: '', buttons: [] }], id : '', selectedIntent : {id: ''}});
  }


  addNewMessage(message: any) {
    message.push({imgUrl: '', title: '', subtitle: '', buttons: []});
  }

  addNewButton(carousel: any) {
    carousel.buttons.push({'url': '', name: '', text: '' });
  }

  saveAnswer(i: number) {
    const selIntent = this.carousels[i]['selectedIntent'];
    const body = {
      intentId: selIntent.id,
      intentName: selIntent.name,
      message: this.carousels[i].message,
      type: 'carousel'
    };
    this.http.post('http://localhost:8081/answers', body).toPromise()
      .then((response: any) => {
          this.toastr.success(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">The answer is saved.</span>',
            '',
            {
              timeOut: 4000,
              closeButton: true,
              enableHtml: true,
              toastClass: 'alert alert-success alert-with-icon',
              positionClass: 'toast-' + 'top' + '-' + 'center'
            });
      })
      .catch(e => {
        console.log(e);
      });
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
    this.http.get('http://localhost:8081/answers/carousel').toPromise()
      .then(response => {
        // tslint:disable-next-line:forin
        for (const value in response) {
          this.carousels.push({message : response[value]['message'], id: response[value]['_id'], selectedIntent : {id : response[value]['intentId']}});
        }
      })
      .catch(e => {
        console.log(e);
      })
  }

  selectIntent(targetElement: any, i: number) {
    const intent = this.intents.find(t => t.name === targetElement);
    this.selectedIntent.push({index : i, id: intent.id, name: targetElement});
    this.carousels[i]['selectedIntent'] = {index : i, id: intent.id, name: targetElement};
  }

  deleteAnswer(carousel_id: any) {
    this.http.delete('http://localhost:8081/answers/' + carousel_id).toPromise()
      .then((response: any) => {
        this.carousels = this.carousels.filter(item => item.id !== carousel_id);
      })
      .catch(e => {
        console.log(e);
      })
  }

  editAnswer(id, i: number) {
    const selIntent = this.carousels[i]['selectedIntent'];
    const body = {
      intentId: selIntent.id,
      intentName: selIntent.name,
      message: this.carousels[i].message,
      type: 'carousel'
    };
      this.http.put('http://localhost:8081/answers/' + id, body).toPromise()
        .then((response: any) => {
            this.toastr.success(
              '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">The answer is updated.</span>',
              '',
              {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: 'alert alert-success alert-with-icon',
                positionClass: 'toast-' + 'top' + '-' + 'center'
              });
        })
        .catch(e => {
          console.log(e);
        })
  }
}
