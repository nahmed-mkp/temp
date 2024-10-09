import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizingSheetLayoutComponent } from './sizing-sheet-layout.component';

describe('SizingSheetLayoutComponent', () => {
  let component: SizingSheetLayoutComponent;
  let fixture: ComponentFixture<SizingSheetLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizingSheetLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizingSheetLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
