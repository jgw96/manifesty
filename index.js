#!/usr/bin/env node

"use strict";

const fs = require("fs");
const inq = require("inquirer");

inq.prompt([
    {
        type: "input",
        name: "name",
        message: "What is the name of your application?",
        default: "Cool Application"
    },
    {
        type: "input",
        name: "short_name",
        message: "What is the short name of your app? This will be displayed when your app is added to the homescreen",
        default: "Cool App"
    },
    {
        type: "list",
        name: "display",
        message: "What would you like your display type to be?",
        choices: [
            "standalone",
            "fullscreen",
            "minimal-ui",
            "browser"
        ],
        default: "standalone"
    },
    {
        type: "input",
        name: "color",
        message: "What is your apps color?",
        default: "blue"
    },
    {
        type: "input",
        name: "icon_src",
        message: "What is the path to your apps icon?"
    }
]).then((answers) => {
    fs.writeFile("manifest.json",
        `
  {
  "name": "${answers.name}",
  "short_name": "${answers.short_name}",
  "start_url": "index.html",
  "display": "${answers.display}",
  "icons": [
    {
      "src": "${answers.icon_src}",
      "sizes": "144x144",
      "type": "image/png"
    }
  ],
  "background_color": "${answers.color}",
  "theme_color": "${answers.color}"
}
`, (err) => {
            if (err) {
                throw err;
            }
            else {
                console.log("Manifest written");
            }
        });
}).catch((err) => {
    throw err;
});


