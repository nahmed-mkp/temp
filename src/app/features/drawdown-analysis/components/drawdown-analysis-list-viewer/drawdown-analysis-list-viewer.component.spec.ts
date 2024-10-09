import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawdownAnalysisListViewerComponent } from './drawdown-analysis-list-viewer.component';

describe('DrawdownAnalysisListViewerComponent', () => {
  let component: DrawdownAnalysisListViewerComponent;
  let fixture: ComponentFixture<DrawdownAnalysisListViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawdownAnalysisListViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawdownAnalysisListViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
