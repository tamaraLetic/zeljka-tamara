import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAccommodationComponent } from './approve-accommodation.component';

describe('ApproveAccommodationComponent', () => {
  let component: ApproveAccommodationComponent;
  let fixture: ComponentFixture<ApproveAccommodationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveAccommodationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
