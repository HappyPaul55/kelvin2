import { accessSync, readdirSync, statSync } from "fs";
import fs from 'fs';
import Bold from "@/Prompts/Styling/Bold";
import Header from "@/Prompts/Styling/Header";
import { execSync } from "child_process";

export default function CreateStatePrompt() {
  const result: string[] = [];

  result.push(Header('Current State'));

  // Get a list of executables.
  result.push(Bold('You have access to the following programs via the bash command:'));
  const paths = process.env.PATH?.split(':') ?? [];
  const executables: Record<string, boolean> = {};
  paths.map(dir => {
    try {
      // Ignore `/mnt` and WSL executables.
      if (dir.startsWith('/mnt/') || dir.startsWith('/usr/lib/wsl/lib')) {
        return [];
      }
      const files = readdirSync(dir);
      return files.filter(file => {
        const fullPath = `${dir}/${file}`;
        try {
          accessSync(fullPath, fs.constants.X_OK);
          if (statSync(fullPath).isFile()) {
            executables[file] = true;
          }
        } catch {
          return false;
        }
      });
    } catch {
      return [];
    }
  });
  result.push(Object.keys(executables).join(' '), "")

  result.push(Bold('The current project structure is:'));
  result.push(execSync('git ls-tree -r HEAD --name-only').toString('utf8'));

  result.push(Header('End Current State'), "");

  return result.join("\r\n");
}