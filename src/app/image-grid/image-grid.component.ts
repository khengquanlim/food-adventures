import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})
export class ImageGridComponent implements OnInit {
  // imageUrls: string[] = [
  //   'assets/images/avocado.jpeg',
  //   'assets/images/cake.jpeg',
  //   'assets/images/crepe.jpeg',
  //   'assets/images/pancake.jpeg',
  //   'assets/images/pasta.jpeg',
  //   'assets/images/potato.jpeg',
  //   'assets/images/steak.jpeg',
  //   // Add jpeg image URLs as needed
  // ];

  @Input() images?: string[]; // An array of image URLs
  @Input() numberOfColumns!: number;
  @Input() deleteMode?: boolean;
  @Output() imageSelected = new EventEmitter<any>();

  selectedImages: { [key: string]: boolean } = {};

  @Input() imageWidth: string = '600px';
  @Input() imageHeight: string = '600px';


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
