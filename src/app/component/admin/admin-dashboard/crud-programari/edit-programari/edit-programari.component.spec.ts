import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgramariComponent } from './edit-programari.component';

describe('EditProgramariComponent', () => {
  let component: EditProgramariComponent;
  let fixture: ComponentFixture<EditProgramariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProgramariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProgramariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
