import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

class GalleryImage {
    fileName: string;
    url: string;
}

@Component({
    selector: 'app-gallery',
    templateUrl: './app-gallery.component.html'
})
export class GalleryComponent implements OnInit, OnChanges {

    @Input() options: any;
    @Input() images: GalleryImage[];

    constructor() { }

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    ngOnInit(): void {

        this.galleryOptions = [
            {
                width: '600px',
                height: '400px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            // max-width 800
            {
                breakpoint: 800,
                width: '100%',
                height: '600px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            // max-width 400
            {
                breakpoint: 400,
                preview: false
            }
        ];

        this.galleryImages = [];
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.warn(changes)
        if (changes && changes.images && changes.images.currentValue) { 
            this.galleryImages = [];
            changes.images.currentValue.forEach((image: GalleryImage) => {
                this.galleryImages.push({'small': image.url, 'medium': image.url, 'big': image.url});                
            });
        }
    }
}