# 🚦 Permission Testing Toolkit

**Permission Testing Toolkit** is a blazing-fast CLI tool that helps developers automatically test access rules (RBAC/ABAC) configured in [Permit.io](https://www.permit.io/) across multiple users, resources, and actions — using both custom test cases and live schema introspection.

> ✅ Built with performance, automation, and CI/CD integration in mind — no UI needed.

---

## 📦 Features

- ✅ **Custom Permission Tests** — Define explicit test cases for users, actions, and expected results.
- 🚀 **Live Schema Introspection** — Auto-generate permission tests based on your Permit.io policy schema.
- 🧠 **Role Coverage Testing** — Dynamically test every role against every action on every resource.
- 💥 **CI/CD Friendly** — Easily integrate into pipelines to prevent policy regressions.
- 🛠️ **Developer-First** — CLI-only experience, blazing-fast, fully written in TypeScript.

---

## 📸 Demo Output

```bash
$ npm start

  ____                            ____ _               _    
 |  _ \ ___ _ __ _ __ ___        / ___| |__   ___  ___| | __
 | |_) / _ \ '__| '_ ` _ \ _____| |   | '_ \ / _ \/ __| |/ /
 |  __/  __/ |  | | | | | |_____| |___| | | |  __/ (__|   < 
 |_|   \___|_|  |_| |_| |_|      \____|_| |_|\___|\___|_|\_\
                                                            
Running tests from config: test-cases/perm-config.json

📝 Permission Test Report:
========================================
1. Viewer can read a post
   ➤ User: viewer
   ➤ Resource: post
   ➤ Action: read
   ➤ Expected: allow, Actual: allow
   ➤ ✅ PASS

2. Editor cannot delete a post
   ➤ User: editor
   ➤ Resource: post
   ➤ Action: delete
   ➤ Expected: deny, Actual: deny
   ➤ ✅ PASS

✔️  2/2 tests passed.
```

## 🧪 How It Works
You provide a .json config of test cases (or use live schema introspection), and the CLI will:
- Authenticate to Permit.io with your API key.
- Run access checks for each test case.
- Compare actual results against expectations.
- Print a full test report to the console.

## 🚀 Getting Started
### 1. Clone and install
```bash
git clone https://github.com/your-username/permission-testing-toolkit
cd permission-testing-toolkit
npm install
```
### 2. Set up environment
Create a .env file at the root:
```bash
PERMIT_API_KEY=your-permit-api-key-here
```
### 3. Add your test config
Create a test file like test-cases/perm-config.json:
```bash
{
  "tests": [
    {
      "user": "admin",
      "resource": "post",
      "action": "delete",
      "expected": "allow"
    },
    {
      "user": "editor",
      "resource": "post",
      "action": "delete",
      "expected": "deny"
    }
  ]
}
```
### 4. Run tests
```bash
npm start
```

### ⚙️ CLI Options
```bash
$ node dist/index.js --help

Usage: Permission Testing Toolkit [options]

CLI tool to test permissions using Permit.io

Options:
  -c, --config <path>   Path to config file (default: test-cases/perm-config.json)
  -v, --version         Output the current version
  -h, --help            Display help for command
```

## ✨ Advanced Mode: Auto-Test from Schema
The tool can auto-generate tests using your Permit.io schema (all roles × all actions):
```bash
await tester.runTestsFromSchema();
```
This mode dynamically covers everything in your Permit.io setup.

## 🌍 Global CLI Installation
You can also install this tool globally to use it like a native CLI:

1. Install globally:
```bash
npm install -g .
```
2. Run from anywhere:
```bash
perm-check --config path/to/perm-config.json
```


## 💡 Use Cases
- 🔁 Regression tests for changing policies
- 🧪 CI pipelines for role-based access control (RBAC)
- ✅ Confidence in your Permit.io logic across environments

## 🧰 Tech Stack
- Node.js (TypeScript)
- Permit.io SDK + API
- Commander (CLI)
- Dotenv
- Axios / Fetch

## 📜 License
MIT