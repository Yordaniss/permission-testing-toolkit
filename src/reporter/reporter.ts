// src/reporter/reporter.ts
import { TestResult } from "../tester/testerEngine";

export function printReport(results: TestResult[]): void {
  console.log("\n📝 Permission Test Report:");
  console.log("=".repeat(40));

  results.forEach((result, index) => {
    const status = result.passed ? "✅ PASS" : "❌ FAIL";
    console.log(result);
    console.log(
      `${index + 1}. ${result.description}
   ➤ User: ${result.userId}
   ➤ Resource: ${result.resource}
   ➤ Action: ${result.action}
   ➤ Expected: ${result.expected}, Actual: ${result.actual}
   ➤ ${status}
   `
    );
  });

  const passed = results.filter(r => r.passed).length;
  console.log(`\n✔️  ${passed}/${results.length} tests passed.`);
}
