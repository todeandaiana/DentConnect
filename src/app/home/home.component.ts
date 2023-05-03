import { Component } from '@angular/core';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'none'},
    {text: 'Two', cols: 1, rows: 2, color: 'none'},
    {text: 'Three', cols: 1, rows: 1, color: 'none'},
    {text: 'Four', cols: 2, rows: 1, color: 'none'},
  ];
}
