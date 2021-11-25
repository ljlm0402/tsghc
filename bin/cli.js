#!/usr/bin/env node

/*****************************************************************
 * The generated project is a tsghc.
 * The person who developed it is AGUMON <ljlm0402@gmail.com>.
 * The date of development is September 29, 2020.
 *****************************************************************/
"use strict";

const inquirer = require("inquirer");
const path = require("path");
const { readdir } = require("fs").promises;
const clone = require("git-clone");
const log = require("./log.js");

const createProject = async () => {
  try {
    log.cli();
    let decide, info;
    const { project } = await inputProjectName();

    do {
      const { framework } = await selectedFramework();
      const { template } = await selectedTemplate(framework);
      info = await getTemplateInfo(framework, template);
      decide = await decideTemplate(template);
    } while (!decide);

    await cloneProject(project, info);
  } catch (error) {
    console.error(error);
  }
};

const inputProjectName = () => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "project",
          message: "Please enter the desired project name.",
          default: "Selected Template Name",
        },
      ])
      .then((result) => {
        resolve({
          project: result.project.replace(/\s+/g, "-").toLowerCase(),
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const selectedFramework = () => {
  return new Promise(async (resolve, reject) => {
    let framework = await readdir(path.join(__dirname, "../template"), {
      withFileTypes: true,
    });
    framework = framework
      .filter((p) => !p.isDirectory())
      .map((p) =>
        p.name
          .replace(".js", "")
          .replace(/\b[a-z]/, (letter) => letter.toUpperCase())
      );

    inquirer
      .prompt([
        {
          type: "list",
          name: "framework",
          message: "Please select the desired project Freamework.",
          choices: framework,
        },
      ])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const selectedTemplate = (framework) => {
  return new Promise((resolve, reject) => {
    const template = require(`../template/${framework.toLowerCase()}`).map(
      (template) => template.title
    );

    inquirer
      .prompt([
        {
          type: "list",
          name: "template",
          message: `The Freamework you choose is ${framework}. Select the template you want.`,
          choices: template,
        },
      ])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getTemplateInfo = (framework, template) => {
  const data = require(`../template/${framework.toLowerCase()}`).find(
    (t) => t.title === template
  );
  log.info(data);
  return data;
};

const decideTemplate = (template) => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "decide",
          message: `Would you like to decide with the ${template} template ?`,
        },
      ])
      .then((result) => {
        resolve(result.decide);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const cloneProject = (project, template) => {
  return new Promise((resolve, reject) => {
    try {
      const projectName =
        project === "selected-template-name" ? template.title : project;
      clone(template.url, `./${projectName}`);
      log.interactive();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

createProject();
