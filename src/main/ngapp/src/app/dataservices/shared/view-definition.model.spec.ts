import { ViewDefinition } from "@dataservices/shared/view-definition.model";
import { CompositionOperator } from "@dataservices/shared/composition-operator.enum";
import { CompositionType } from "@dataservices/shared/composition-type.enum";

describe("ViewDefinition", () => {
  let viewDefn: ViewDefinition;

  beforeEach(() => {
    viewDefn = null;
  });

  it("should create", () => {
    console.log("========== [ViewDefinition] should create");
    viewDefn = ViewDefinition.create(
      {
        "viewName": "viewDefnName",
        "keng__description": "viewDescription",
        "isComplete": true,
        "sourcePaths":
          [
            "sourcePath1",
            "sourcePath2"
          ],
        "compositions":
          [
            {
              "name": "compositionName",
              "leftSourcePath": "sourcePath1",
              "rightSourcePath": "sourcePath2",
              "leftCriteriaColumn": "leftCriteriaCol",
              "rightCriteriaColumn": "rightCriteriaCol",
              "type": "INNER_JOIN",
              "operator": "EQ"
            }
          ],
        "projectedColumns": {
          "default": true,
          "columns": []
        }
      }
    );

    expect(viewDefn.getName()).toEqual("viewDefnName");
    expect(viewDefn.getDescription()).toEqual("viewDescription");
    expect(viewDefn.complete).toEqual(true);
    expect(viewDefn.getSourcePaths().length).toEqual(2);
    expect(viewDefn.getSourcePaths()[0]).toEqual("sourcePath1");
    expect(viewDefn.getSourcePaths()[1]).toEqual("sourcePath2");
    expect(viewDefn.getCompositions().length).toEqual(1);
    expect(viewDefn.getCompositions()[0].getName()).toEqual("compositionName");
    expect(viewDefn.getCompositions()[0].getLeftSourcePath()).toEqual("sourcePath1");
    expect(viewDefn.getCompositions()[0].getRightSourcePath()).toEqual("sourcePath2");
    expect(viewDefn.getCompositions()[0].getLeftCriteriaColumn()).toEqual("leftCriteriaCol");
    expect(viewDefn.getCompositions()[0].getRightCriteriaColumn()).toEqual("rightCriteriaCol");
    expect(viewDefn.getCompositions()[0].getType()).toEqual(CompositionType.INNER_JOIN);
    expect(viewDefn.getCompositions()[0].getOperator()).toEqual(CompositionOperator.EQ);
  });

});
