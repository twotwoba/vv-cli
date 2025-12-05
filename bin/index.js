#!/usr/bin/env node
import { program } from "commander";
import inquirer from "inquirer";
import fse from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Template paths
const templatePathVue = path.resolve(__dirname, "../template-vue");
const templatePathReact = path.resolve(__dirname, "../template-react");
const templatePathExtension = path.resolve(__dirname, "../template-extension");
// Read package.json to get version
const packageJson = JSON.parse(fse.readFileSync(path.resolve(__dirname, "../package.json"), "utf8"));
const templateChoices = [
    { name: "Vue3 + Vite + Naive UI + Unocss", value: "vue" },
    { name: "React19 + Vite + shadcn/ui + tailwindcss", value: "react" },
    { name: "Chrome Extension + React19 + tailwindcss", value: "extension" }
];
const templatePaths = {
    vue: templatePathVue,
    react: templatePathReact,
    extension: templatePathExtension
};
/**
 * Validate project name
 * - Must start with a letter, number, or @
 * - Can only contain letters, numbers, hyphens, underscores, dots, and slashes (for scoped packages)
 * - Cannot be empty
 */
function validateProjectName(name) {
    if (!name || name.trim() === "") {
        return "Project name is required";
    }
    // Check for invalid characters
    const validNameRegex = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/i;
    if (!validNameRegex.test(name)) {
        return "Project name can only contain letters, numbers, hyphens, underscores, dots, and @ for scoped packages";
    }
    // Check if directory already exists
    if (fse.existsSync(name)) {
        return `Directory "${name}" already exists`;
    }
    return true;
}
/**
 * Main CLI action
 */
async function createProject(projectName, options) {
    try {
        // If project name is not provided, ask for it
        if (!projectName) {
            const answer = await inquirer.prompt([
                {
                    type: "input",
                    name: "projectName",
                    message: "Please enter your project name:",
                    validate: validateProjectName
                }
            ]);
            projectName = answer.projectName;
        }
        else {
            // Validate provided project name
            const validationResult = validateProjectName(projectName);
            if (validationResult !== true) {
                console.error(chalk.red(`Error: ${validationResult}`));
                process.exit(1);
            }
        }
        let template;
        // Check if template is provided via CLI option
        if (options?.template) {
            const validTemplates = ["vue", "react", "extension"];
            if (!validTemplates.includes(options.template)) {
                console.error(chalk.red(`Error: Invalid template "${options.template}". Valid options: ${validTemplates.join(", ")}`));
                process.exit(1);
            }
            template = options.template;
        }
        else {
            // Ask for template type interactively
            const answer = await inquirer.prompt([
                {
                    type: "list",
                    name: "template",
                    message: "Select a template:",
                    choices: templateChoices
                }
            ]);
            template = answer.template;
        }
        const templatePath = templatePaths[template];
        const targetPath = path.resolve(process.cwd(), projectName);
        // Start spinner for copying files
        const spinner = ora("Creating project directory...").start();
        try {
            // Copy template files
            await fse.copy(templatePath, targetPath, {
                filter: (src) => {
                    const basename = path.basename(src);
                    return basename !== "node_modules" && basename !== ".git";
                }
            });
            spinner.succeed("Project files copied");
            // Rename gitignore to .gitignore
            spinner.start("Configuring project...");
            const gitignorePath = path.join(targetPath, "gitignore");
            const dotGitignorePath = path.join(targetPath, ".gitignore");
            if (await fse.pathExists(gitignorePath)) {
                await fse.rename(gitignorePath, dotGitignorePath);
            }
            // Update package.json
            const pkgPath = path.join(targetPath, "package.json");
            const pkg = await fse.readJson(pkgPath);
            pkg.name = projectName;
            // For Chrome Extension template, also update description
            if (template === "extension") {
                pkg.description = `A Chrome Extension for ${projectName}`;
            }
            await fse.writeJson(pkgPath, pkg, { spaces: 2 });
            spinner.succeed("Project configured");
        }
        catch (error) {
            spinner.fail("Failed to create project");
            throw error;
        }
        // Success message
        console.log(chalk.green("\n✨ Project created successfully!\n"));
        console.log("Next steps:");
        console.log(chalk.cyan(`  cd ${projectName}`));
        console.log(chalk.cyan("  pnpm install"));
        console.log(chalk.cyan("  pnpm dev"));
        if (template === "extension") {
            console.log("\n📌 Chrome Extension Development:");
            console.log(chalk.yellow("  1. Run 'pnpm dev' to build the extension"));
            console.log(chalk.yellow("  2. Open Chrome and go to chrome://extensions/"));
            console.log(chalk.yellow("  3. Enable 'Developer mode'"));
            console.log(chalk.yellow("  4. Click 'Load unpacked' and select the 'dist' folder"));
            console.log(chalk.yellow("  5. Your extension will be loaded and ready for development!"));
        }
        console.log("");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(chalk.red("Error creating project:"), error.message);
        }
        else {
            console.error(chalk.red("Error creating project:"), error);
        }
        process.exit(1);
    }
}
// Setup CLI
program
    .name("vv")
    .description("CLI tool for creating Vue3/React + Vite projects and Chrome Extensions")
    .version(packageJson.version);
program
    .argument("[project-name]", "Name of the project")
    .option("-t, --template <template>", "Template to use (vue, react, extension)")
    .action(createProject);
program.parse();
