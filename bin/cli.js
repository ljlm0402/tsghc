#!/usr/bin/env node

/*****************************************************************
 * The generated project is a tsghc.
 * The person who developed it is AGUMON <ljlm0402@gmail.com>.
 * The date of development is September 29, 2020.
 *****************************************************************/
'use strict';

const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
const path = require('path');
const { readdir } = require('fs').promises;
const clone = require("git-clone");

async function createProject() {
  try {
    console.log(
      chalk.blue.bgWhite(
        figlet.textSync("TypeScript GitHub Cli", { horizontalLayout: "fitted", font: "Standard" })
      )
    );

    const project = await getProject();
    const template = await getTemplate(project);
    const target = await cloneProject(project, template);

    console.log(chalk.green('Your Starter Template created.'));
    console.info(chalk.yellow(`Template Info \n name: ${target.name} \n author: ${target.author} \n github: ${target.url}`));
  } catch(error) {
    console.error(chalk.red(error));
  }
}

function getProject() {
  return new Promise(async (resolve, reject) => {
    try {
      const contents = await readdir(path.join(__dirname, '../template'), { withFileTypes: true });
      const result = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Please enter the desired project name.",
          default: "Selected Template Name",
        },
        {
          type: "list",
          name: "framework",
          message: "Please select the desired project Freamework.",
          choices: contents.filter(p => !p.isDirectory()).map(p => (p.name).replace('.js', '').replace(/\b[a-z]/, letter => letter.toUpperCase()))
        }
      ]);
  
      result.name = result.name.replace(/\s+/g, "-").toLowerCase();
      resolve(result);
    } catch(error) {
      reject(error);
    }
  });
};

function getTemplate(project) {
  return new Promise((resolve, reject) => {
    try {
      const frameworkPrompt = [
        {
          type: "list",
          name: "template",
          message: `The Freamework you choose is ${project.framework}. Select the template you want.`,
          choices: require(`../template/${project.framework.toLowerCase()}`).map(template => template.name)
        }
      ];

      resolve(frameworkPrompt);
    } catch(error) {
      reject(error);
    }
  });
};

function cloneProject(project, template) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await inquirer.prompt(template);
      const projectName = project.name === 'selected-template-name' ? result.template : project.name;
      const target = require(`../template/${project.framework.toLowerCase()}`).find(template => template.name === result.template);
      clone(target.url, `./${projectName}`);

      resolve(target);
    } catch(error) {
      reject(error);
    }
  });
}

createProject();
