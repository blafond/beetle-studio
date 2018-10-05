import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectedColumnsEditorComponent } from './projected-columns-editor.component';

describe('ProjectedColumnsEditorComponent', () => {
  let component: ProjectedColumnsEditorComponent;
  let fixture: ComponentFixture<ProjectedColumnsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectedColumnsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectedColumnsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
