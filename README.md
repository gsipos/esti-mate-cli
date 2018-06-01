[![Build Status](https://travis-ci.org/gsipos/esti-mate-cli.svg?branch=master)](https://travis-ci.org/gsipos/esti-mate-cli)
![npm](https://img.shields.io/npm/v/esti-mate-cli.svg)
[![Coverage Status](https://coveralls.io/repos/github/gsipos/esti-mate-cli/badge.svg?branch=master)](https://coveralls.io/github/gsipos/esti-mate-cli?branch=master)


# EstiMate CLI

CLI tool for quickly drafting project estimations.
When you need to estimate a task, or a small project, then this is a tool for you.
Open a command line, start EstiMate type in your estimations, and see how much time the whole project is going to take.
After that you can export the results to a CSV file, so you can import it into a spreadsheet, and send to a project manager or sales colleague for example.

The [three-point estimation](https://en.wikipedia.org/wiki/Three-point_estimation) technique is used.
It means you have to give 3 estimations for a task instead of one.
The 3 estimate are the `best case`, `worst case`, and `most likely`.
This is more flexible, easier to express uncertainity about tasks.

## Installation
```bash
npm i esti-mate-cli -g
```

## Start

Start with the command:
```bash
esti-mate-cli
```
or with the shorter command:
```bash
emc
```

## Usage

> The project is automatically saved to a JSON file in the directory where the CLI has been started after every modification.
> You don't have to save manually.

* [Select a project](./doc/menus/choose-project-menu.md)
* [Create project](./doc/menus/create-project-menu.md)
* [Working with project](./doc/menus/project-menu.md)
  * [Add task](./doc/menus/add-task-menu.md)
  * [Show project summary](./doc/menus/show-project-summary.md)
  * [Show tasks](./doc/menus/show-tasks.md)
  * [Show tags](./doc/menus/show-tags.md)
  * [Modifing tasks](./doc/menus/modify-task.md)
  * [Export tasks to CSV](./doc/menus/export-tasks-to-csv.md)
  * [Export tags to CSV](./export-tags-to-csv.md)

## Data handling
Your data will not be sent over the network.
No analytics data is gathered currently.
EstiMate only creates a JSON file in the folder, you are running it in, to store the data You enter.
Other files(e.g.: CSV) may be created when You want to export your data in an other format.
