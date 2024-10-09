import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolPortfoliosLayoutComponent } from './pool-portfolios-layout.component';

describe('PoolPortfoliosLayoutComponent', () => {
  let component: PoolPortfoliosLayoutComponent;
  let fixture: ComponentFixture<PoolPortfoliosLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolPortfoliosLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolPortfoliosLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
