import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigDataApplicationComponent } from './big-data-application.component';

describe('BigDataApplicationComponent', () => {
  let component: BigDataApplicationComponent;
  let fixture: ComponentFixture<BigDataApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigDataApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigDataApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
