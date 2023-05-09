import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReviewDoctoriComponent } from './show-review-doctori.component';

describe('ShowReviewDoctoriComponent', () => {
  let component: ShowReviewDoctoriComponent;
  let fixture: ComponentFixture<ShowReviewDoctoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowReviewDoctoriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowReviewDoctoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
