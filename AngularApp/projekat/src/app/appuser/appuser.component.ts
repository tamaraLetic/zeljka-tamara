import { Component, OnInit, Input } from '@angular/core';
import {AppUser} from '../appuser/appuser.model';

@Component({
  selector: 'appuser',
  templateUrl: './appuser.component.html',
  styleUrls: ['./appuser.component.css']
})
export class AppuserComponent implements OnInit {

 @Input() appuser: AppUser;

  constructor() { }

  ngOnInit() {
  }

}
