import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-help-search',
  templateUrl: './help-search.component.html',
  styleUrls: ['./help-search.component.css']
})
export class HelpSearchComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.router.navigate(['/showAccommodations']);
  }

}
