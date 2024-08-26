import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUpdateClientComponent } from './popup-update-client.component';

describe('PopupUpdateClientComponent', () => {
  let component: PopupUpdateClientComponent;
  let fixture: ComponentFixture<PopupUpdateClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PopupUpdateClientComponent]
    });
    fixture = TestBed.createComponent(PopupUpdateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
