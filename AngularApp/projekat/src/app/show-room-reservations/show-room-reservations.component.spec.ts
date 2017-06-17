import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRoomReservationsComponent } from './show-room-reservations.component';

describe('ShowRoomReservationsComponent', () => {
  let component: ShowRoomReservationsComponent;
  let fixture: ComponentFixture<ShowRoomReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRoomReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRoomReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
