import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReviewsDoctoriComponent } from './show-reviews-doctori.component';

describe('ShowReviewsDoctoriComponent', () => {
  let component: ShowReviewsDoctoriComponent;
  let fixture: ComponentFixture<ShowReviewsDoctoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowReviewsDoctoriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowReviewsDoctoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
