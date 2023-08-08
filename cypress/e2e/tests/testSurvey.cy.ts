import * as assignSurvey from "../helpers/adminHelpers/assignSurvey";

describe("Create new account page", () => {
  it("test", () => {
    assignSurvey.assignSurveyToPatient();
    assignSurvey.unassignSurveyToPatient();
  });
});
