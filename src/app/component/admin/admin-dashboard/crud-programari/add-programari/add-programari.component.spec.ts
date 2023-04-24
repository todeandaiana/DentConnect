import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramariComponent } from './add-programari.component';

describe('AddProgramariComponent', () => {
  let component: AddProgramariComponent;
  let fixture: ComponentFixture<AddProgramariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgramariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProgramariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
