/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a crud resoruce actions',
  prompts: [
    {
      type: 'input',
      name: 'containerName',
      message: 'In what containenr',
      default: '',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? true
            : 'no such container';
        }

        return 'The name is required';
      },
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: '',
      validate: value => {
        if (/.+/.test(value)) {
          return true;
        }

        return 'The name is required';
      },
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'append',
        path: '../../app/containers/{{properCase containerName}}/constants.js',
        templateFile: './action/constant.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'append',
        path: '../../app/containers/{{properCase containerName}}/actions.js',
        templateFile: './action/action.js.hbs',
        abortOnFail: true,
      },
    ];


    actions.push({
      type: 'prettify',
      path: '/containers/',
    });

    return actions;
  },
};
