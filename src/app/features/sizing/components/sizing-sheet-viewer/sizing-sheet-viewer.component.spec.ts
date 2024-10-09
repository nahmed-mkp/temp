import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizingSheetViewerComponent } from './sizing-sheet-viewer.component';

describe('SizingSheetViewerComponent', () => {
  let component: SizingSheetViewerComponent;
  let fixture: ComponentFixture<SizingSheetViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizingSheetViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizingSheetViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
