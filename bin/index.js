#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import fse from "fs-extra";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePathVue = path.resolve(__dirname, "../template-vue");
const templatePathReact = path.resolve(__dirname, "../template-react");
const templatePathExtension = path.resolve(__dirname, "../template-extension");

// Read package.json to get version
const packageJson = JSON.parse(
    fse.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")
);

program
    .name("vv-cli")
    .description("CLI tool for creating Vue3/React + Vite projects and Chrome Extensions")
    .version(packageJson.version);

program
    .argument("[project-name]", "Name of the project")
    .action(async (projectName) => {
        try {
            // If project name is not provided, ask for it
            if (!projectName) {
                const answer = await inquirer.prompt([
                    {
                        type: "input",
                        name: "projectName",
                        message: "Please enter your project name:",
                        validate: (input) => {
                            if (!input) return "Project name is required";
                            if (fse.existsSync(input))
                                return "Directory already exists";
                            return true;
                        },
                    },
                ]);
                projectName = answer.projectName;
            }

            // Check if directory already exists
            if (fse.existsSync(projectName)) {
                console.error(
                    chalk.red(`Error: Directory ${projectName} already exists`)
                );
                process.exit(1);
            }

            // Ask for template type
            const templateAnswer = await inquirer.prompt([
                {
                    type: "list",
                    name: "template",
                    message: "Select a template:",
                    choices: [
                        {
                            name: "Vue3 + Vite + Naive UI + Unocss",
                            value: "vue",
                        },
                        {
                            name: "React19 + Vite + shadcn/ui + tailwindcss",
                            value: "react",
                        },
                        {
                            name: "Chrome Extension + React19 + tailwindcss",
                            value: "extension",
                        },
                    ],
                },
            ]);

            // Set template path based on user choice
            let templatePath;
            switch (templateAnswer.template) {
                case "vue":
                    templatePath = templatePathVue;
                    break;
                case "react":
                    templatePath = templatePathReact;
                    break;
                case "extension":
                    templatePath = templatePathExtension;
                    break;
                default:
                    templatePath = templatePathReact;
            }

            // Create project directory
            const targetPath = path.resolve(process.cwd(), projectName);

            // Copy template files
            console.log(chalk.blue("Creating project directory..."));
            await fse.copy(templatePath, targetPath, {
                filter: (src) => {
                    const basename = path.basename(src);
                    return basename !== "node_modules" && basename !== ".git";
                },
            });

            // Rename gitignore to .gitignore
            // .gitignore will not update to npm registry
            const gitignorePath = path.join(targetPath, "gitignore");
            const dotGitignorePath = path.join(targetPath, ".gitignore");
            if (await fse.pathExists(gitignorePath)) {
                await fse.rename(gitignorePath, dotGitignorePath);
            }

            // Update package.json
            const pkgPath = path.join(targetPath, "package.json");
            const pkg = await fse.readJson(pkgPath);
            pkg.name = projectName;
            
            // For Chrome Extension template, also update manifest.config.ts
            if (templateAnswer.template === "extension") {
                pkg.description = `A Chrome Extension for ${projectName}`;
                await fse.writeJson(pkgPath, pkg, { spaces: 2 });
                
                // Update manifest.config.ts
                const manifestPath = path.join(targetPath, "manifest.config.ts");
                if (await fse.pathExists(manifestPath)) {
                    let manifestContent = await fse.readFile(manifestPath, "utf8");
                    manifestContent = manifestContent.replace(
                        'email: "your@gmail.com"',
                        'email: "your@gmail.com" // TODO: Update your email'
                    );
                    await fse.writeFile(manifestPath, manifestContent);
                }
            } else {
                await fse.writeJson(pkgPath, pkg, { spaces: 2 });
            }

            console.log(chalk.green("\n✨ Project created successfully!"));
            console.log("\nNext steps:");
            console.log(chalk.cyan(`  cd ${projectName}`));
            console.log(chalk.cyan("  pnpm install"));
            
            if (templateAnswer.template === "extension") {
                console.log(chalk.cyan("  pnpm dev"));
                console.log("\n📌 Chrome Extension Development:");
                console.log(chalk.yellow("  1. Run 'pnpm dev' to build the extension"));
                console.log(chalk.yellow("  2. Open Chrome and go to chrome://extensions/"));
                console.log(chalk.yellow("  3. Enable 'Developer mode'"));
                console.log(chalk.yellow("  4. Click 'Load unpacked' and select the 'dist' folder"));
                console.log(chalk.yellow("  5. Your extension will be loaded and ready for development!"));
                console.log(chalk.yellow("\n  💡 Don't forget to update manifest.config.ts with your details"));
            } else {
                console.log(chalk.cyan("  pnpm dev"));
            }
            console.log("");
        } catch (error) {
            console.error(chalk.red("Error creating project:"), error);
            process.exit(1);
        }
    });

program.parse();
