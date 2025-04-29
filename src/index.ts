import "dotenv/config";  // 👈 This will load your .env file
import { Command } from "commander";
import { loadConfig } from "./config/configLoader";
import { TesterEngine } from "./tester/testerEngine";  // ⬅️ Only import the class, not 'runTests' function
import { PermitClient } from "./permit/permitClient";   // ⬅️ You also need PermitClient
import { printReport } from "./reporter/reporter";

const program = new Command();

program
  .name("Permission Testing Toolkit")
  .description("CLI tool to test permissions using Permit.io")
  .version("0.1.0")
  .option("-c, --config <path>", "Path to config file", "test-cases/perm-config.json")
  .parse(process.argv);

const options = program.opts();

async function main() {
  console.log("🚀 Starting Permission Tests...");

  try {
    const config = await loadConfig(options.config);

    const permitApiKey = process.env.PERMIT_API_KEY;
    if (!permitApiKey) {
      throw new Error("PERMIT_API_KEY not set in environment variables.");
    }

    const permitClient = new PermitClient(permitApiKey);
    const tester = new TesterEngine(permitClient);

    const results = await tester.runTests(config.tests); // 👈 not config directly, but config.tests array
    printReport(results);
  } catch (error) {
    console.error("❌ Error:", (error as Error).message);
    process.exit(1);
  }
}

main();
