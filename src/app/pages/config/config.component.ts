import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'config-cmp',
    moduleId: module.id,
    templateUrl: 'config.component.html'
})

export class ConfigComponent implements OnInit {
  private config: any;
  private http: HttpClient;
  private toastr: ToastrService;

  constructor(http: HttpClient, toastr: ToastrService) {
    this.http = http;
    this.toastr = toastr;
  }

  ngOnInit(): void {
    this.fetchConfig();
  }

  editConfig() {
    const data = {
        fallback: this.config.fallback,
        threshold: this.config.threshold
    }
    this.http.put('http://localhost:8081/config/', data).toPromise()
      .then((response: any) => {
        this.toastr.success(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Config table is updated.</span>',
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

  fetchConfig() {
    this.http.get('http://localhost:8081/config').toPromise()
      .then(response => {
        this.config = {fallback: response[0]['fallback'], threshold: response[0]['threshold']};
      })
      .catch(e => {
        console.log(e);
      })
  }
}
