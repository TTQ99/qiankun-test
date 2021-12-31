import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaUploadComponent } from './ba-upload.component';

describe('BaUploadComponent', () => {
  let component: BaUploadComponent;
  let fixture: ComponentFixture<BaUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
