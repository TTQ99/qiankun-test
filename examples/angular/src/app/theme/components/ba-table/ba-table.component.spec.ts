/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaTableComponent } from './ba-table.component';

describe('BaTableComponent', () => {
  let component: BaTableComponent;
  let fixture: ComponentFixture<BaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
