import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowServiciiComponent } from './show-servicii.component';

describe('ShowServiciiComponent', () => {
  let component: ShowServiciiComponent;
  let fixture: ComponentFixture<ShowServiciiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowServiciiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowServiciiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
