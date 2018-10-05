/**
 * @license
 * Copyright 2017 JBoss Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ProjectedColumn } from "@dataservices/shared/projected-column.model";

/**
 * ProjectedColumns model - holds projected columns array and ordering info
 */
export class ProjectedColumns {

  public default = true;
  private originalColumns: ProjectedColumn[] = [];
  private columns: ProjectedColumn[] = [];

  /**
   * @param {Object} json the JSON representation of ProjectedColumns
   * @returns {ProjectedColumns} the new ProjectedColumns (never null)
   */
  public static create( json: object = {} ): ProjectedColumns {
    const projCols = new ProjectedColumns();
    for (const field of Object.keys(json)) {
      if (field === "default") {
        const test = json[field];
        projCols.default = test;
      } else if (field === "columns") {
        const cols: ProjectedColumn[] = [];
        const arrayElems = json[field];
        for (const arrayElem of arrayElems) {
          const compStr = JSON.stringify(arrayElem);
          if (compStr.length > 2) {
            const col = ProjectedColumn.create(arrayElem);
            cols.push(col);
          }
        }
        projCols.setColumns(cols);
      }
    }
    return projCols;
  }

  constructor() {
    // nothing to do
  }

  /**
   * @returns {ProjectedColumn[]} the projected columns array
   */
  public getColumns(): ProjectedColumn[] {
    return this.columns;
  }

  /**
   * @param {string} name the column name
   */
  public setColumns( columns: ProjectedColumn[] ): void {
    if (columns && columns !== null && columns.length > 0) {
      this.default = false;
    }
    this.originalColumns = columns;
    this.columns = [...this.originalColumns];
  }

  /**
   * Determine if all columns are selected
   * @return {boolean} 'true' if all columns are selected
   */
  public allColumnsSelected(): boolean {
    if (this.default) return true;

    for (const projCol of this.columns) {
      if (!projCol.selected) {
        return false;
      }
    }
    return true;
  }

  /**
   * Gets the SQL string for the currently included columns
   * @returns {string} the SQL string
   */
  public getSql(): string {
    let sql = "";
    if (this.allColumnsSelected()) {
      sql = "*";
    } else {
      let nIncluded = 0;
      for ( let i = 0; i < this.columns.length; i++ ) {
        const projCol = this.columns[i];
        if (projCol.selected) {
          if (nIncluded !== 0) {
            sql = sql.concat(", " + projCol.getName());
          } else {
            sql = sql.concat(projCol.getName());
          }
          nIncluded++;
        }
      }
    }
    return sql;
  }

  /**
   * Determine if the supplied ProjectedColumns is equal to this.
   * 'equal' means that the current projected columns ordering and details are the same
   * @param {ProjectedColumns} otherProjColumns
   */
  public isEqual( otherProjColumns: ProjectedColumns ): boolean {
    if (this.default && otherProjColumns.default) return true;

    const thisCols = this.columns;
    const otherCols = otherProjColumns.getColumns();
    if (thisCols === otherCols) return true;
    if (thisCols == null || otherCols == null) return false;
    if (thisCols.length !== otherCols.length) return false;

    for (let colIndx = 0; colIndx < thisCols.length; colIndx++) {
      if ( !thisCols[colIndx].isEqual(otherCols[colIndx]) ) {
        return false;
      }
    }
    return true;
  }

}
