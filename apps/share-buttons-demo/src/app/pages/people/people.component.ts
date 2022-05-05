import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mintplayer-ng-share-buttons-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  constructor() {}
  
  numbers = [...Array(9).keys()];
  
  ngOnInit(): void {}

}
