import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAppuserComponent } from './register-appuser.component';

describe('RegisterAppuserComponent', () => {
  let component: RegisterAppuserComponent;
  let fixture: ComponentFixture<RegisterAppuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAppuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAppuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
