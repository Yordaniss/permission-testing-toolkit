import { TestCase, TestResult } from "../tester/testerEngine";

const { Permit } = require("permitio");

export interface PermitCheckInput {
  user: string; // user id or role
  resource: string; // resource name
  action: string; // action to test
}

export class PermitClient {
  private apiKey: string;
  private apiUrl: string;
  private permit: typeof Permit;

  constructor(
    apiKey: string,
    apiUrl: string = "https://cloudpdp.api.permit.io"
  ) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
    this.permit = new Permit({
      pdp: apiUrl,
      token: apiKey,
    });
  }

  async checkPermission(input: PermitCheckInput): Promise<boolean> {
    try {

      const permitted = await this.permit.check(
        input.user,
        input.action,
        input.resource
      );

      return permitted;
    } catch (error) {
      console.error("❌ Error contacting Permit.io:", error);
      return false;
    }
  }

  async fetchTestsFromSchema(): Promise<TestCase[]> {
    const roles = await this.permit.api.roles.list();
    const resources = await this.permit.api.resources.list();

    const testCases: TestCase[] = [];

    for (const role of roles) {
      for (const resource of resources) {
        const actions = resource.actions ?? {};

        for (const [actionKey] of Object.entries(actions)) {
          testCases.push({
            description: `Check ${actionKey} for ${role.key}`,
            userId: role.key,
            resource: resource.key,
            action: actionKey,
            expected: "allow",
          });
        }
      }
    }

    return testCases;
  }
}
