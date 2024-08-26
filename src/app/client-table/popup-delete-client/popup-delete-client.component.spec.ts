import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteClientComponent } from './popup-delete-client.component';

describe('PopupDeleteClientComponent', () => {
  let component: PopupDeleteClientComponent;
  let fixture: ComponentFixture<PopupDeleteClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PopupDeleteClientComponent]
    });
    fixture = TestBed.createComponent(PopupDeleteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
