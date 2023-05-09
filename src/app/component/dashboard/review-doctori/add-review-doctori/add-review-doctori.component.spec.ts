import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReviewDoctoriComponent } from './add-review-doctori.component';

describe('AddReviewDoctoriComponent', () => {
  let component: AddReviewDoctoriComponent;
  let fixture: ComponentFixture<AddReviewDoctoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReviewDoctoriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReviewDoctoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
