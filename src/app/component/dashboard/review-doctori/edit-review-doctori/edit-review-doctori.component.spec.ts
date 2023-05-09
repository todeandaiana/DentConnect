import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReviewDoctoriComponent } from './edit-review-doctori.component';

describe('EditReviewDoctoriComponent', () => {
  let component: EditReviewDoctoriComponent;
  let fixture: ComponentFixture<EditReviewDoctoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReviewDoctoriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReviewDoctoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
