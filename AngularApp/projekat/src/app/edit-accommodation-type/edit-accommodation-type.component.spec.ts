import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccommodationTypeComponent } from './edit-accommodation-type.component';

describe('EditAccommodationTypeComponent', () => {
  let component: EditAccommodationTypeComponent;
  let fixture: ComponentFixture<EditAccommodationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAccommodationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccommodationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
