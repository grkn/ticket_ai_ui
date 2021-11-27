import {Component, OnInit} from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'maps-cmp',
  templateUrl: 'webchat.component.html'
})

export class WebchatComponent implements OnInit {
  isCollapsed = false;
  webchat: String = '<div style="position:absolute !important;bottom:0px;right:15px;">\n' +
    '    <table>\n' +
    '      <tr>\n' +
    '        <td>\n' +
    '          <button type="button" class="btn btn-info big-btn" style="width:370px"\n' +
    '                  data-toggle="collapse" data-target="#chatToggle" (click)="isCollapsed = !isCollapsed" [attr.aria-expanded]="!isCollapsed"\n' +
    '                  [attr.aria-expanded]="!isCollapsed">\n' +
    '            Talk to BOT\n' +
    '          </button>\n' +
    '        </td>\n' +
    '      </tr>\n' +
    '      <tr>\n' +
    '        <td>\n' +
    '          <iframe id="chatToggle" width="370px" height="420px" [ngbCollapse]="isCollapsed"\n' +
    '                  src="http://localhost:8081/webchat"\n' +
    '                  style="border-top:none;border-right:none;border-bottom:none;border-left:1px solid rgb(195, 195, 195) !important;border-image:initial;"></iframe>\n' +
    '        </td>\n' +
    '      </tr>\n' +
    '    </table>\n' +
    '  </div>';

  ngOnInit() {
  }
}
