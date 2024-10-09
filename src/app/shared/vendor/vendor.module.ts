import { NgModule } from '@angular/core';
import { MomentModule } from 'ngx-moment';
import { HighchartsChartModule } from 'highcharts-angular';
import { FileUploadModule } from 'ng2-file-upload';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import * as fromFactories from '../../factories';
import * as  fromServices from './../../services';
import * as fromComponents from '../../components';
import { MaterialModule } from '../material/material.module';
import { NativeModule } from '../native/native.module';

import { ColorSketchModule } from 'ngx-color/sketch';

const VENDOR_MODULES = [
    MomentModule,
    FileUploadModule,
    HighchartsChartModule,
    ColorSketchModule,
    NgxGalleryModule
];

const SHARED_COMPONENTS = [
    fromComponents.AppLineChartComponent,
    fromComponents.AppPieChartComponent,
    fromComponents.AppBarChartComponent,
    fromComponents.AppStockChartComponent,
    fromComponents.AppBaseGridComponent,
    fromComponents.AppCustomGridCellCheckboxComponent,
    fromComponents.AppCustomGridCellCrudOperationComponent,
    fromComponents.AppGridLayoutManagementComponent,
    fromComponents.AppGridLayoutRowGroupingConfigurationComponent,
    fromComponents.AppGridLayoutColumnConfigurationComponent,
    fromComponents.AppCustomColorPickerComponent,
    fromComponents.AppGridGroupingBackgroundConfigurationComponent,
    fromComponents.AppGridCustomStatusBarCellValueComponent,
    fromComponents.AppGridCustomStatusBarCellRangesStatisticComponent,
    fromComponents.AppCustomAutogroupFloatingFilterComponent,
    fromComponents.AppGridLayoutBasicRowGroupingConfigurationComponent,
    fromComponents.AppUserLockConditionCheckDialogComponent,
    fromComponents.UnconfirmedTradesDialogComponent,
    fromComponents.GridCellGeneralButtonComponent,
    fromComponents.GridCellDatePickerComponent,
    fromComponents.AppGridCustomCellAutocompleteDropdownComponent,
    fromComponents.AppGridCustomCellMultiTypesEditorComponent,
    fromComponents.GalleryComponent
];

const SHARED_SERVICES = [
    fromFactories.HighchartsFactory,
    fromFactories.HighchartsDataService,
    fromFactories.NotificationService,
];

@NgModule({
    declarations: [
        ...SHARED_COMPONENTS
    ],
    imports: [
        HighchartsChartModule,
        AgGridModule.withComponents([]),
        ...VENDOR_MODULES,
        MaterialModule,
        NativeModule
    ],
    exports: [
        ...VENDOR_MODULES,
        ...SHARED_COMPONENTS
    ],
    providers: [
        ...SHARED_SERVICES
    ]
})
export class VendorModule { }
