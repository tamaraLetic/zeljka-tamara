import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReservationsListComponent } from './room-reservations-list.component';

describe('RoomReservationsListComponent', () => {
  let component: RoomReservationsListComponent;
  let fixture: ComponentFixture<RoomReservationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomReservationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomReservationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
