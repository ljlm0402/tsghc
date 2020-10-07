/*****************************************************************
 * The generated project is a tsghc.
 * The person who developed it is AGUMON <ljlm0402@gmail.com>.
 * The date of development is September 29, 2020.
 *****************************************************************/
'use strict';

const figlet = require('figlet');
const chalk = require('chalk');
const { Signale } = require('signale');

exports.cli = () => {
  console.log(
      chalk.blue.bgWhite(
        figlet.textSync('TypeScript GitHub Clone', { horizontalLayout: 'fitted', font: 'Standard' })
      )
    );
};

exports.info = (data) => {
  const option = {
    types: {
      url: {
        badge: '❤️',
        color: 'red',
        label: 'URL'
      },
      title: {
        badge: '💛',
        color: 'yellow',
        label: 'TITLE'
      },
      author: {
        badge: '💚',
        color: 'green',
        label: 'AUTHOR'
      },
      desc: {
        badge: '💙',
        color: 'blue',
        label: 'DESC'
      }
    }
  };

  const template = new Signale(option);
  data.url && template.url(data.url);
  data.title && template.title(data.title);
  data.author && template.author(data.author);
  data.description && template.desc(data.description);
};

exports.interactive = () => {
  const interactive = new Signale({ interactive: true });
  interactive.wait('[%d / 3] - Get GitHub Repositories Info.', 1);

    setTimeout(() => {
      interactive.start('[%d / 3] - Start GitHub Repositories Clone', 2);
      setTimeout(() => {
        interactive.complete('[%d / 3] - Complete GitHub Repositories Clone', 3);
      }, 1000);
    }, 1000);
};
