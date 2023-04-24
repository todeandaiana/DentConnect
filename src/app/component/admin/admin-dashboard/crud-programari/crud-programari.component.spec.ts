import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudProgramariComponent } from './crud-programari.component';

describe('CrudProgramariComponent', () => {
  let component: CrudProgramariComponent;
  let fixture: ComponentFixture<CrudProgramariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudProgramariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudProgramariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
