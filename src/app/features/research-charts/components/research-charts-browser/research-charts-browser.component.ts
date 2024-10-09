import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ResearchChartDialogComponent } from '../research-charts-dialog/research-charts-dialog.component';

import * as fromModels from './../../models/chart.models';

@Component({
    selector: 'app-research-charts-browser',
    templateUrl: './research-charts-browser.component.html',
    styleUrls: ['./research-charts-browser.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResearchChartsBrowserComponent implements OnInit, OnChanges {

    @Input() chartPacks: fromModels.IChartPack[];
    @Input() chartPacksLoading: boolean;
    @Input() chartPacksLoaded: boolean;
    @Input() chartPacksError: string;

    @Input() selectedChartPack: fromModels.IChartPack;

    @Input() chartPackImages: fromModels.IChartPackImage[];
    @Input() chartPackImagesLoading: boolean;
    @Input() chartPackImagesLoaded: boolean;
    @Input() chartPackImagesError: string;

    @Output() loadChartPack: EventEmitter<fromModels.IChartPack> = new EventEmitter<fromModels.IChartPack>();

    constructor(public dialog: MatDialog) { }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.chartPacks && changes.chartPacks.currentValue) { 
            if (changes.chartPacks.currentValue.length > 0 && 
                    (this.selectedChartPack === undefined || this.selectedChartPack === null)) { 
                this.loadChartPack.emit(changes.chartPacks.currentValue[0]);
            }
        }
        
    }

    isSelected(chartPack: fromModels.IChartPack): boolean {
        if (this.selectedChartPack !== null && this.selectedChartPack !== undefined) {
            return chartPack.feature === this.selectedChartPack.feature;
        }
        return false;
    }

    panelClicked(chartPack: fromModels.IChartPack): void { 
        if (this.selectedChartPack === null || this.selectedChartPack === undefined) { 
            this.loadChartPack.emit(chartPack);
        } else if (chartPack.feature !== this.selectedChartPack.feature) {
            this.loadChartPack.emit(chartPack);
        }
    }

    showImage(image: fromModels.IChartPackImage): void {
        this.dialog.open(ResearchChartDialogComponent, {
            width: '900px',
            height: '920px',
            data: image
        });
    }
}
