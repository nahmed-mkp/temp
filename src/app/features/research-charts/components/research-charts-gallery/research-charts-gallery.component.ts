import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from '@kolkov/ngx-gallery';

import * as fromModels from './../../models/chart.models';

@Component({
    selector: 'app-research-charts-gallery',
    templateUrl: './research-charts-gallery.component.html',
    styleUrls: ['./research-charts-gallery.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResearchChartsGalleryComponent implements OnInit, OnChanges {

    @Input() selectedChartPack: fromModels.IChartPack;

    @Input() chartPackCharts: fromModels.ISubChart;
    @Input() chartPackChartsLoading: boolean;
    @Input() chartPackChartsLoaded: boolean;
    @Input() chartPackChartsError: string;

    galleryOptions: NgxGalleryOptions[] = [
        {
            width: '600px',
            height: '600px',
            imageAnimation: NgxGalleryAnimation.Slide,
            imageAutoPlay: false,
            imageAutoPlayPauseOnHover: false,
            previewAutoPlay: false,
            previewCloseOnClick: true,
            previewCloseOnEsc: true,
            imagePercent: 90,
            imageSize: NgxGalleryImageSize.Contain
        }, {
            breakpoint: 600,
            thumbnailsPercent: 10,
            thumbnailsMargin: 10,
            thumbnailMargin: 10,
            thumbnailsColumns: 3
        }
    ];

    galleryImages: NgxGalleryImage[];

    constructor() { }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {        
        if (changes && changes.chartPackCharts && changes.chartPackCharts.currentValue) { 

            const images = changes.chartPackCharts.currentValue.images;
            const validImages = images.filter((image: fromModels.IChartPackImage) => image.url !== null || images.url !== undefined)
            this.galleryImages = validImages.map((image: fromModels.IChartPackImage) => {
                return {
                    small: image.url,
                    medium: image.url,
                    big: image.url
                }
            });
        }
    }
}