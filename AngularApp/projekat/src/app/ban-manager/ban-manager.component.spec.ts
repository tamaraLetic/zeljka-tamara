import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanManagerComponent } from './ban-manager.component';

describe('BanManagerComponent', () => {
  let component: BanManagerComponent;
  let fixture: ComponentFixture<BanManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
