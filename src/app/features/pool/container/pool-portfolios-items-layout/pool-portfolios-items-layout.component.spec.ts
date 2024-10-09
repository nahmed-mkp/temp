import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolPortfoliosItemsLayoutComponent } from './pool-portfolios-items-layout.component';

describe('PoolPortfoliosItemsLayoutComponent', () => {
  let component: PoolPortfoliosItemsLayoutComponent;
  let fixture: ComponentFixture<PoolPortfoliosItemsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolPortfoliosItemsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolPortfoliosItemsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
