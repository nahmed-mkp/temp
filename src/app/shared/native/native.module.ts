import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

const NATIVE_MODULES = [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LayoutModule,
];

@NgModule({
    imports: [
        ...NATIVE_MODULES
    ],
    exports: [
        ...NATIVE_MODULES
    ]
})
export class NativeModule { }
