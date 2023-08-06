import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendperfumeComponent } from './trendperfume.component';

describe('TrendperfumeComponent', () => {
  let component: TrendperfumeComponent;
  let fixture: ComponentFixture<TrendperfumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendperfumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendperfumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
