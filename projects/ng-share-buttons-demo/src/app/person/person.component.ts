import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  id: string | null = null;

  ngOnInit(): void {
  }

}
