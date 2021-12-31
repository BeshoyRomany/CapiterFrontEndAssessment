import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableActionsComponent } from './user-table-actions.component';

describe('UserTableActionsComponent', () => {
  let component: UserTableActionsComponent;
  let fixture: ComponentFixture<UserTableActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTableActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
