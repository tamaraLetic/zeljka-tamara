import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAccommodatonComponent } from './show-accommodaton.component';

describe('ShowAccommodatonComponent', () => {
  let component: ShowAccommodatonComponent;
  let fixture: ComponentFixture<ShowAccommodatonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAccommodatonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAccommodatonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
