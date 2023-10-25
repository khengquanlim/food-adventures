import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})
export class ImageGridComponent implements OnInit {

  @Input() images!: string[]; // An array of image URLs
  @Input() numberOfColumns!: number;
  @Input() deleteMode?: boolean;
  @Output() imageSelected = new EventEmitter<any>();

  selectedImages: { [key: string]: boolean } = {};

  constructor() { }

  ngOnInit(): void {
  } 

  toggleImageSelection(image: string): void {
    
    if (this.deleteMode) {
      // Emit the selected image to the parent component
      this.selectedImages[image] = !this.selectedImages[image];
      this.imageSelected.emit(image);
      
    }
  }
}
