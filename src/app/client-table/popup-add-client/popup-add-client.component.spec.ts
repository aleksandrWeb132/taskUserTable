import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddClientComponent } from './popup-add-client.component';

describe('PopupAddClientComponent', () => {
  let component: PopupAddClientComponent;
  let fixture: ComponentFixture<PopupAddClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PopupAddClientComponent]
    });
    fixture = TestBed.createComponent(PopupAddClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
