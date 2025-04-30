import { PermitClient, PermitCheckInput } from "../permit/permitClient";

export interface TestCase {
  description: string;
  userId: string;
  resource: string;
  action: string;
  expected: "allow" | "deny";
}

export interface TestResult extends TestCase {
  actual: "allow" | "deny";
  passed: boolean;
}

export class TesterEngine {
  private permitClient: PermitClient;

  constructor(permitClient: PermitClient) {
    this.permitClient = permitClient;
  }

  async runTests(testCases: TestCase[]): Promise<TestResult[]> {
    return this.checkTestResult(testCases);
  }

  async runTestsFromSchema(): Promise<TestResult[]> {
    const testCases = await this.permitClient.fetchTestsFromSchema();
    return this.checkTestResult(testCases);
  }

  async checkTestResult(testCases: TestCase[]): Promise<TestResult[]> {
    const results: TestResult[] = [];

    for (const testCase of testCases) {
      const allowed = await this.permitClient.checkPermission({
        user: testCase.userId,
        resource: testCase.resource,
        action: testCase.action,
      });

      const actual = allowed ? "allow" : "deny";

      results.push({
        ...testCase,
        actual,
        passed: actual === testCase.expected,
      });
    }

    return results;
  }
}
