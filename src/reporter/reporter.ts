import { TestResult } from "../tester/testerEngine";
import chalk from 'chalk';

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
  console.log(chalk.blue.bold("\nSummary:"));
  console.log(chalk.green(`✔ Passed: ${passed}`));
  console.log(chalk.red(`✘ Failed: ${results.length - passed}`));
  console.log(chalk.bold(`Total: ${results.length}\n`));
}
