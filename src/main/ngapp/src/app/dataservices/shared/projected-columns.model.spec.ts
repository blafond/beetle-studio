import { ProjectedColumns } from "@dataservices/shared/projected-columns.model";

describe("ProjectedColumns", () => {
  let projCols1: ProjectedColumns;
  let projCols2: ProjectedColumns;
  let projCols3: ProjectedColumns;

  beforeEach(() => {
    projCols1 = null;
    projCols2 = null;
    projCols3 = null;
  });

  it("should create", () => {
    console.log("========== [ProjectedColumns] should create");
    projCols1 = ProjectedColumns.create(
      {
        "default": true,
        "columns": [
        ]
      }
    );

    projCols2 = ProjectedColumns.create(
      {
        "default": false,
        "columns": [
          {
            "name": "colName1",
            "type": "string",
            "selected": true
          }
        ]
      }
    );

    projCols3 = ProjectedColumns.create(
      {
        "default": false,
        "columns": [
          {
            "name": "colName1",
            "type": "string",
            "selected": false
          },
          {
            "name": "colName2",
            "type": "string",
            "selected": true
          },
          {
            "name": "colName3",
            "type": "integer",
            "selected": false
          }
        ]
      }
    );

    expect(projCols1.default).toEqual(true);
    expect(projCols1.getColumns().length).toEqual(0);

    expect(projCols2.default).toEqual(false);
    expect(projCols2.getColumns().length).toEqual(1);

    expect(projCols3.default).toEqual(false);
    expect(projCols3.getColumns().length).toEqual(3);
    expect(projCols3.getColumns()[0].getName()).toEqual("colName1");
    expect(projCols3.getColumns()[1].getName()).toEqual("colName2");
    expect(projCols3.getColumns()[2].getName()).toEqual("colName3");
    expect(projCols3.getColumns()[0].getType()).toEqual("string");
    expect(projCols3.getColumns()[1].getType()).toEqual("string");
    expect(projCols3.getColumns()[2].getType()).toEqual("integer");
    expect(projCols3.getColumns()[0].selected).toEqual(false);
    expect(projCols3.getColumns()[1].selected).toEqual(true);
    expect(projCols3.getColumns()[2].selected).toEqual(false);
  });

});
