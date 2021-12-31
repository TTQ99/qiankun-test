/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaConfigTheadComponent } from './ba-config-thead.component';

describe('BaConfigTheadComponent', () => {
  let component: BaConfigTheadComponent;
  let fixture: ComponentFixture<BaConfigTheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaConfigTheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaConfigTheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
