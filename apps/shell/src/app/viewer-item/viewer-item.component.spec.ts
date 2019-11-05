import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerItemComponent } from './viewer-item.component';

describe('ViewerItemComponent', () => {
  let component: ViewerItemComponent;
  let fixture: ComponentFixture<ViewerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
