import {
  generateProgressDetails,
  generateProgressTitle,
} from "./generate_progress";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubProjConfig } from "../types";
/* eslint-enable @typescript-eslint/no-unused-vars */

describe("generate progress tests", () => {
  const subprojects: SubProjConfig[] = [
    {
      checks: [{ id: "p1_check", satisfied: true }],
      id: "proj1",
      paths: [
        {
          location: "projects/p1/**",
        },
      ],
    },
    {
      checks: [{ id: "p2_check", satisfied: false }],
      id: "proj2",
      paths: [
        {
          location: "projects/p2/**",
        },
      ],
    },
  ];

  const checksStatusLookup: Record<string, string> = {
    "p1_check": "success",
    "p2_check": "success",
  };

  test("sanity check", () => {
    expect(() => {
      generateProgressDetails(subprojects, checksStatusLookup);
    }).not.toThrow();
  });

  test("should include correct checks", () => {
    const progress = generateProgressDetails(subprojects, checksStatusLookup);
    expect(progress).toContain("p1_check");
    expect(progress).toContain("p2_check");
  });

  test("should include project names", () => {
    const progress = generateProgressDetails(subprojects, checksStatusLookup);
    expect(progress).toContain("proj2");
    expect(progress).toContain("proj1");
  });

  test("should include avaialbe checks", () => {
    const progress = generateProgressDetails(subprojects, checksStatusLookup);
    expect(progress).toContain("received checks are");
    expect(progress).toContain("with status");
  });

  test("should include marks", () => {
    const progress = generateProgressDetails(subprojects, checksStatusLookup);
    expect(progress).toContain("- [x] ");
  });

  test("should include correct marks", () => {
    const checksStatusLookupWithFailure: Record<string, string> = {
      "p1_check": "success",
      "p2_check": "failure",
    };
    const progress = generateProgressDetails(
      subprojects,
      checksStatusLookupWithFailure,
    );
    expect(progress).toContain("- [x] ");
    expect(progress).toContain("- [ ] ");
  });

  test("should treat undefined as not finished", () => {
    const checksStatusLookupWithMissing: Record<string, string> = {
      "p1_check": "success",
    };
    const progress = generateProgressDetails(
      subprojects,
      checksStatusLookupWithMissing,
    );
    expect(progress).toContain("- [x] ");
    expect(progress).toContain("- [ ] ");
  });

  test("title generation should not crash", () => {
    expect(() => {
      generateProgressTitle(subprojects, checksStatusLookup);
    }).not.toThrow();
  });

  test("title should have correct amount", () => {
    const checksStatusLookupWithMissing: Record<string, string> = {
      "p1_check": "success",
    };
    expect(
      generateProgressTitle(subprojects, checksStatusLookupWithMissing),
    ).toMatch("Pending (1/2)");
  });
});
