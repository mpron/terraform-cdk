/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { Language, TerraformModuleConstraint } from "./config";
import { ConstructsMakerModuleTarget } from "./construct-maker-target";

describe("ConstructsMakerModuleTarget", () => {
  it.each([
    { fqn: "cloudposse/label/null", name: "null.label" },
    {
      fqn: "terraform-google-modules/project-factory/google",
      name: "google.project_factory",
    },
    {
      fqn: "terraform-aws-modules/vpc/aws@5.0.0",
      name: "aws.vpc",
    },
    {
      fqn: "terraform-aws-modules/eks/aws//modules/self-managed-node-group",
      name: "aws.eks.modules.self_managed_node_group",
    },
    {
      fqn: {
        name: "my-local-module",
        source: "./path/to/local/terraform/module",
      },
      name: "my-local-module",
    },
  ])("should have a srcMakName", ({ fqn, name }) => {
    const constraint = new TerraformModuleConstraint(fqn as any);
    const target = new ConstructsMakerModuleTarget(
      constraint,
      Language.TYPESCRIPT
    );
    expect(target.srcMakName).toBe(name);
  });
});
