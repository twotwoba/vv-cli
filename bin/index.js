#!/usr/bin/env node

import { program } from 'commander'
import inquirer from 'inquirer'
import fse from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const templatePathVue = path.resolve(__dirname, '../template-vue')
const templatePathReact = path.resolve(__dirname, '../template-react')

// Read package.json to get version
const packageJson = JSON.parse(fse.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'))

program
    .name('vv-cli')
    .description('CLI tool for creating Vue3/React + Vite projects')
    .version(packageJson.version)

program.argument('[project-name]', 'Name of the project').action(async (projectName) => {
    try {
        // If project name is not provided, ask for it
        if (!projectName) {
            const answer = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'projectName',
                    message: 'Please enter your project name:',
                    validate: (input) => {
                        if (!input) return 'Project name is required'
                        if (fse.existsSync(input)) return 'Directory already exists'
                        return true
                    }
                }
            ])
            projectName = answer.projectName
        }

        // Check if directory already exists
        if (fse.existsSync(projectName)) {
            console.error(chalk.red(`Error: Directory ${projectName} already exists`))
            process.exit(1)
        }

        // Ask for template type
        const templateAnswer = await inquirer.prompt([
            {
                type: 'list',
                name: 'template',
                message: 'Select a template:',
                choices: [
                    { name: 'Vue3 + Vite + Naive UI + Unocss', value: 'vue' },
                    { name: 'React19 + Vite + shadcn/ui + tailwindcss', value: 'react' }
                ]
            }
        ])

        // Set template path based on user choice
        const templatePath = templateAnswer.template === 'vue' ? templatePathVue : templatePathReact

        // Create project directory
        const targetPath = path.resolve(process.cwd(), projectName)

        // Copy template files
        console.log(chalk.blue('Creating project directory...'))
        await fse.copy(templatePath, targetPath)

        // Update package.json
        const pkgPath = path.join(targetPath, 'package.json')
        const pkg = await fse.readJson(pkgPath)
        pkg.name = projectName
        await fse.writeJson(pkgPath, pkg, { spaces: 2 })

        console.log(chalk.green('\n✨ Project created successfully!'))
        console.log('\nNext steps:')
        console.log(chalk.cyan(`  cd ${projectName}`))
        console.log(chalk.cyan('  pnpm install'))
        console.log(chalk.cyan('  pnpm dev\n'))
    } catch (error) {
        console.error(chalk.red('Error creating project:'), error)
        process.exit(1)
    }
})

program.parse()
