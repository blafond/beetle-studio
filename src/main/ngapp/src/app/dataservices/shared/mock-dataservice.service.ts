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

import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { AppSettingsService } from "@core/app-settings.service";
import { LoggerService } from "@core/logger.service";
import { Dataservice } from "@dataservices/shared/dataservice.model";
import { DataserviceService } from "@dataservices/shared/dataservice.service";
import { NewDataservice } from "@dataservices/shared/new-dataservice.model";
import { NotifierService } from "@dataservices/shared/notifier.service";
import { Table } from "@dataservices/shared/table.model";
import { VdbService } from "@dataservices/shared/vdb.service";
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

@Injectable()
export class MockDataserviceService extends DataserviceService {

  private serv1 = new Dataservice();
  private serv2 = new Dataservice();
  private serv3 = new Dataservice();
  private services: Dataservice[] = [this.serv1, this.serv2, this.serv3];

  constructor(http: Http, vdbService: VdbService, appSettings: AppSettingsService,
              notifierService: NotifierService, logger: LoggerService ) {
    super(http, vdbService, appSettings, notifierService, logger);
    this.serv1.setId("serv1");
    this.serv1.setServiceViewTables(["table1", "table2"]);
    this.serv1.setServiceViewModel("viewModel");
    const viewNames: string[] = [];
    viewNames.push("views");
    this.serv1.setServiceViewNames(viewNames);
    this.serv2.setId("serv2");
    this.serv2.setServiceViewTables(["table1", "table2"]);
    this.serv2.setServiceViewModel("viewModel");
    this.serv2.setServiceViewNames(viewNames);
    this.serv3.setId("serv3");
    this.serv3.setServiceViewTables(["table1", "table2"]);
    this.serv3.setServiceViewModel("viewModel");
    this.serv3.setServiceViewNames(viewNames);
  }

  /**
   * Get the dataservices from the komodo rest interface
   * @returns {Observable<Dataservice[]>}
   */
  public getAllDataservices(): Observable<Dataservice[]> {
    return Observable.of(this.services);
  }

  /**
   * Create a dataservice via the komodo rest interface
   * @param {NewDataservice} dataservice
   * @returns {Observable<boolean>}
   */
  public createDataservice(dataservice: NewDataservice): Observable<boolean> {
    return Observable.of(true);
  }

  /**
   * Delete a dataservice via the komodo rest interface
   * @param {string} dataserviceId
   * @returns {Observable<boolean>}
   */
  public deleteDataservice(dataserviceId: string): Observable<boolean> {
    return Observable.of(true);
  }

  /**
   * Get the current Dataservice selection
   * @returns {Dataservice} the selected Dataservice
   */
  public getSelectedDataservice( ): Dataservice {
    return this.serv1;
  }

  /**
   * Get the views for the selected Dataservice
   * @returns {Table[]} the views
   */
  public getSelectedDataserviceViews(): Table[] {
    const table: Table = new Table();
    table.setName("views.View1");
    const tables: Table[] = [];
    tables.push(table);

    return tables;
  }

  // /**
  //  * Updates the current Dataservice states - triggers update to be broadcast to interested components
  //  */
  // public updateDataserviceStates(): void {
  //   // Nothing to do
  // }

  // /**
  //  * Polls the server and sends Dataservice state updates at the specified interval
  //  * @param {number} pollIntervalSec the interval (sec) between polling attempts
  //  */
  // public pollDataserviceStatus(pollIntervalSec: number): void {
  //   // Nothing to do
  // }

  /**
   * Query a Dataservice via the komodo rest interface
   * @param {string} query the SQL query
   * @param {string} dataserviceName the dataservice name
   * @param {number} limit the limit for the number of result rows
   * @param {number} offset the offset for the result rows
   * @returns {Observable<boolean>}
   */
  public queryDataservice(query: string, dataserviceName: string, limit: number, offset: number): Observable<any> {
    return Observable.of<any>();
  }

  protected handleError(error: Response): ErrorObservable {
    return Observable.throw(error);
  }

}
