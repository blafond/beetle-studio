import { Component, OnInit } from '@angular/core';
import { ViewEditorService } from "@dataservices/virtualization/view-editor/view-editor.service";
import { SelectionService } from "@core/selection.service";
import { LoadingState } from "@shared/loading-state.enum";
import { EmptyStateConfig, TableConfig, TableEvent } from "patternfly-ng";
import { ViewEditorI18n } from "@dataservices/virtualization/view-editor/view-editor-i18n";
import { ProjectedColumn } from "@dataservices/shared/projected-column.model";
import { ProjectedColumns } from "@dataservices/shared/projected-columns.model";

@Component({
  selector: 'app-projected-columns-editor',
  templateUrl: './projected-columns-editor.component.html',
  styleUrls: ['./projected-columns-editor.component.css']
})
export class ProjectedColumnsEditorComponent implements OnInit {

  public allProjectedColumns: ProjectedColumn[] = [];
  public tableColumns: any[] = [];
  public tableConfig: TableConfig;

  private readonly editorService: ViewEditorService;
  private readonly selectionService: SelectionService;

  private columnsLoadingState: LoadingState = LoadingState.LOADED_VALID;
  private emptyStateConfig: EmptyStateConfig;
  private projColumns: ProjectedColumns = new ProjectedColumns();

  constructor( selectionService: SelectionService,
               editorService: ViewEditorService ) {
    this.selectionService = selectionService;
    this.editorService = editorService;
    this.editorService.setEditorVirtualization( selectionService.getSelectedVirtualization() );
  }

  public ngOnInit(): void {
    // ----------------------------------
    // View Table configurations
    // ----------------------------------
    this.tableColumns = [
      {
        draggable: false,
        name: "Name",
        prop: "name",
        resizeable: true,
        sortable: false,
        width: "60"
      },
      {
        draggable: false,
        name: "Type",
        prop: "type",
        resizeable: true,
        sortable: false,
        width: "60"
      }
    ];

    this.emptyStateConfig = {
      title: ViewEditorI18n.noViewsDisplayedMessage
    } as EmptyStateConfig;

    this.tableConfig = {
      showCheckbox: true,
      emptyStateConfig: this.emptyStateConfig
    } as TableConfig;
  }

  /**
   * Get the current view projected columns
   *
   * @return {ProjectedColumn[]} the projected columns
   */
  public get projectedColumns(): ProjectedColumn[] {
    if (this.hasSelectedView) {
      return this.editorService.getEditorView().getProjectedColumns().getColumns();
    } else {
      return [];
    }
  }

  /**
   * Determine whether the editor has a view currently selected
   *
   * @return {boolean} 'true' if has a view selection
   */
  public get hasSelectedView(): boolean {
    const selView = this.editorService.getEditorView();
    return (selView && selView !== null);
  }

  /**
   * Handles change in Column selections
   * @param {TableEvent} $event the column selection event
   */
  public handleColumnSelectionChange($event: TableEvent): void {
    // Nothing to do
  }

  /**
   * Get the current Sql for the selected columns
   * @return {string} the columns sql
   */
  public get columnsSql( ): string {
    return this.projColumns.getSql();
  }

  /**
   * Determine if columns are loading
   * @returns {boolean}
   */
  public get columnsLoading( ): boolean {
    return ( this.columnsLoadingState === LoadingState.LOADING );
  }

  /**
   * Determine if columns loading completed, and was successful
   * @returns {boolean}
   */
  public get columnsLoadedSuccess( ): boolean {
    return ( this.columnsLoadingState === LoadingState.LOADED_VALID );
  }

  /**
   * Determine if columns loading completed, but failed
   * @returns {boolean}
   */
  public get columnsLoadedFailed( ): boolean {
    return ( this.columnsLoadingState === LoadingState.LOADED_INVALID );
  }

}
