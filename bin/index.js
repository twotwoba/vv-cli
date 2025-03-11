#!/usr/bin/env node

import { program } from 'commander'
import inquirer from 'inquirer'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const templatePath = path.resolve(__dirname, '../template')

program
    .name('vv-cli')
    .description('CLI tool for creating Vue3 + Vite + Naive UI + Unocss template projects')
    .version('1.0.0')

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
                        if (fs.existsSync(input)) return 'Directory already exists'
                        return true
                    }
                }
            ])
            projectName = answer.projectName
        }

        // Check if directory already exists
        if (fs.existsSync(projectName)) {
            console.error(chalk.red(`Error: Directory ${projectName} already exists`))
            process.exit(1)
        }

        // Create project directory
        const targetPath = path.resolve(process.cwd(), projectName)

        // Copy template files
        console.log(chalk.blue('Creating project directory...'))
        await fs.copy(templatePath, targetPath, {
            filter: (src) => {
                return !src.includes('node_modules') && !src.includes('.git')
            }
        })

        // Update package.json
        const pkgPath = path.join(targetPath, 'package.json')
        const pkg = await fs.readJson(pkgPath)
        pkg.name = projectName
        await fs.writeJson(pkgPath, pkg, { spaces: 2 })

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
