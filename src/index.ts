import "dotenv/config";
import { loadConfig } from "./config/configLoader";
import { TesterEngine } from "./tester/testerEngine";
import { PermitClient } from "./permit/permitClient";
import { printReport } from "./reporter/reporter";
import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';

const program = new Command();

program
  .name("perm-check")
  .description("CLI to test application permissions with Permit.io")
  .version("0.1.0")
  .helpOption("-h, --help", "Show help")
  .option(
    "-c, --config <path>",
    "Path to config file",
    "test-cases/perm-config.json"
  )
  .option("-s, --schema", "Run tests from Permit.io schema instead of config")
  .addHelpText(
    "after",
    `
Examples:
  $ perm-check --config test-cases/editor.json
  $ perm-check --schema
`
  )
  .parse(process.argv);

const options = program.opts();

async function main() {
  console.log(
    chalk.cyanBright(
      figlet.textSync("Perm-Check", { horizontalLayout: "default" })
    )
  );  
  try {
    const permitApiKey = process.env.PERMIT_API_KEY;
    if (!permitApiKey) {
      throw new Error("PERMIT_API_KEY not set in environment variables.");
    }

    const permitClient = new PermitClient(permitApiKey);
    const tester = new TesterEngine(permitClient);

    let results;

    if (options.schema) {
      console.log(chalk.yellow("Fetching and running schema-based tests...\n"));
      results = await tester.runTestsFromSchema();
    } else {
      const config = await loadConfig(options.config);
      console.log(chalk.yellow(`Running tests from config: ${options.config}\n`));
      results = await tester.runTests(config.tests);
    }

    printReport(results);
  } catch (error) {
    console.error("❌ Error:", (error as Error).message);
    process.exit(1);
  }
}

main();
