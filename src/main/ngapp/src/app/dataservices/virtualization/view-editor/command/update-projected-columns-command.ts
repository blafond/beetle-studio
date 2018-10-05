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

import { ViewEditorI18n } from "@dataservices/virtualization/view-editor/view-editor-i18n";
import { Command } from "@dataservices/virtualization/view-editor/command/command";
import { CommandType } from "@dataservices/virtualization/view-editor/command/command-type.enum";
import { Composition } from "@dataservices/shared/composition.model";
import { ProjectedColumns } from "@dataservices/shared/projected-columns.model";

export class UpdateProjectedColumnsCommand extends Command {

  /**
   * The command identifier.
   *
   * @type {string}
   */
  public static readonly id = CommandType.UPDATE_PROJECTED_COLUMNS_COMMAND;

  /**
   * The name of the command argument whose value is the new projected columns of the view.
   *
   * @type {string}
   */
  public static readonly newProjectedColumns = "newProjectedColumns";

  /**
   * The name of the command argument whose value is the replaced projected columns of the view.
   *
   * @type {string}
   */
  public static readonly oldProjectedColumns = "oldProjectedColumns";

  /**
   * Constructor
   * the specified ProjectedColumns must be a ProjectedColumns object -OR- stringified projected columns
   * @param {string | ProjectedColumns} newProjectedColumns the new projected columns or stringified projected columns
   *                                   (cannot be `null` or empty)
   * @param {string | ProjectedColumns} oldProjectedColumns the projected columns being replaced or stringified columns
   *                                   (cannot be `null` or empty)
   * @param {string} id the command id.  If not supplied, an id is generated.
   */
  public constructor( newProjectedColumns: string | ProjectedColumns,
                      oldProjectedColumns: string | ProjectedColumns, id?: string) {
    super( UpdateProjectedColumnsCommand.id, ViewEditorI18n.updateProjectedColumnsCommandName );

    let newColsArg: string;
    if ( typeof newProjectedColumns === 'string' ) {
      newColsArg = newProjectedColumns as string;
    } else {
      newColsArg = JSON.stringify(newProjectedColumns);
    }
    this._args.set( UpdateProjectedColumnsCommand.newProjectedColumns, newColsArg );

    let oldColsArg: string;
    if ( typeof oldProjectedColumns === 'string' ) {
      oldColsArg = oldProjectedColumns as string;
    } else {
      oldColsArg = JSON.stringify(oldProjectedColumns);
    }
    this._args.set( UpdateProjectedColumnsCommand.oldProjectedColumns, oldColsArg );

    if (!id) {
      //
      // Generate new id
      //
      id = UpdateProjectedColumnsCommand.id + this.idGen;
    }

    this._args.set( Command.identArg, id);
  }

  /**
   * @returns {ProjectedColumns} the new projected columns
   */
  public getNewProjectedColumns(): ProjectedColumns {
    const newColsStr = this.getArg( UpdateProjectedColumnsCommand.newProjectedColumns ) as string;
    return ProjectedColumns.create(JSON.parse(newColsStr));
  }

  /**
   * @returns {string} json payload for new projected columns
   */
  public getNewProjecteColumnsPayload( ): string {
    return this.getArg( UpdateProjectedColumnsCommand.newProjectedColumns ) as string;
  }

  /**
   * @returns {ProjectedColumns} the old projected columns
   */
  public getOldProjectedColumns(): ProjectedColumns {
    const oldColsStr = this.getArg( UpdateProjectedColumnsCommand.oldProjectedColumns ) as string;
    return ProjectedColumns.create(JSON.parse(oldColsStr));
  }

  /**
   * @returns {string} json payload for old projected columns
   */
  public getOldProjecteColumnsPayload( ): string {
    return this.getArg( UpdateProjectedColumnsCommand.oldProjectedColumns ) as string;
  }

  /**
   * @returns {string} a unique short identifier of this command
   */
  public getId( ): string {
    return this.getArg( Command.identArg ) as string;
  }

}
