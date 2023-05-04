import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDoctoriComponent } from './show-doctori.component';

describe('ShowDoctoriComponent', () => {
  let component: ShowDoctoriComponent;
  let fixture: ComponentFixture<ShowDoctoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDoctoriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDoctoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
