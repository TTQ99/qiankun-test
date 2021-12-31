/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaInputNumberComponent } from './ba-input-number.component';

describe('BaInputNumberComponent', () => {
  let component: BaInputNumberComponent;
  let fixture: ComponentFixture<BaInputNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaInputNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
