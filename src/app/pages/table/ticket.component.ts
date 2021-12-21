import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'table-cmp',
  moduleId: module.id,
  templateUrl: 'ticket.component.html'
})

export class TicketComponent implements OnInit {
  public tableData1: TableData;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.tableData1 = {
      headerRow: ['ID', 'Description', 'Intent', 'Created', 'Status', 'Buttons'],
      dataRows: []
    };


    this.http.get('http://localhost:8081/ticket/all').toPromise()
      .then((response: any) => {
        response.forEach(res => {
          this.tableData1.dataRows.push([res.id, res.description, res.intent, new Date(res.created), res.status.toUpperCase()]);
        });
      })
      .catch(e => {
        console.log(e);
      })


  }

  updateTicket(row: any, status: string) {
    if (row) {
      this.http.put('http://localhost:8081/ticket/', {id: row[0], status: status}).toPromise().then((response: any) => {
        row[4] = status.toUpperCase();
      })
    }
  }
}
