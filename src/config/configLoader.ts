// config/configLoader.ts
import * as fs from "fs/promises";
import * as path from "path";

export interface PermissionTestConfig {
  permitApiKey: string;
  tests: PermissionTestCase[];
}

export interface PermissionTestCase {
  description: string;
  userId: string;
  resource: string;
  action: string;
  expected: "allow" | "deny";
}

export async function loadConfig(configPath: string): Promise<PermissionTestConfig> {
  const fullPath = path.resolve(configPath);
  const fileContent = await fs.readFile(fullPath, "utf-8");
  const parsed = JSON.parse(fileContent);
  return parsed;
}
