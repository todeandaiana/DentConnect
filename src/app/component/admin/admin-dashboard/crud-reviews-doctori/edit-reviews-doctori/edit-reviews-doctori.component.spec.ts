import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReviewsDoctoriComponent } from './edit-reviews-doctori.component';

describe('EditReviewsDoctoriComponent', () => {
  let component: EditReviewsDoctoriComponent;
  let fixture: ComponentFixture<EditReviewsDoctoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReviewsDoctoriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReviewsDoctoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
