import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReviewsComponent } from './show-reviews.component';

describe('ShowReviewsComponent', () => {
  let component: ShowReviewsComponent;
  let fixture: ComponentFixture<ShowReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
