import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})
export class ImageGridComponent implements OnInit {

  @Input() images!: string[]; // An array of image URLs
  @Input() numberOfColumns!: number;

  constructor() { }

  ngOnInit(): void {
  } 

}
