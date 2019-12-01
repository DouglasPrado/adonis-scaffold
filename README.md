# Adonis Scaffold

![Adonis Scaffold Logo](https://github.com/DouglasPrado/adonis-scaffold/blob/master/adonis-scaffold.png)

[![Build Status](https://travis-ci.org/DouglasPrado/adonis-scaffold.svg?branch=master)](https://travis-ci.org/DouglasPrado/adonis-scaffold)
[![Version](https://img.shields.io/npm/v/adonis-scaffold.svg?style=flat)](https://www.npmjs.com/package/adonis-scaffold)
[![Downloads](https://img.shields.io/npm/dt/adonis-scaffold.svg?style=flat)](https://www.npmjs.com/package/adonis-scaffold)
[![License](https://img.shields.io/npm/l/adonis-scaffold.svg?style=flat)](https://www.npmjs.com/package/adonis-scaffold)

Application scaffolding in AdonisJS is a technique that allows the developer to define and create a basic application that can create, retrieve, update and delete objects. Basically CRUD (create, Read, Update, Delete) data operations are common in most of the applications.

### Getting Started

#### Requirements

- Adonis ^4.0
- Postgres ^9.0

#### Installation

Install adonis-scaffold by running the below command.
`npm install adonis-scaffold --save`

#### Register providers.

Also add providers for the newly installed dependencies.

```
const providers = [
  'adonis-scaffold/providers/ScaffoldProvider'
];
```

#### Enviroments

LOGO_URL=https://adonisjs.com/images/header-logo.svg

LOGO_PATH="/images/logo.svg"

COLOR_PRIMARY=#220052

COLOR_SECONDARY=#FB2F51

#### Controllers

Example from Controller extending ScaffoldController:

```
"use strict";

const ScaffoldController = use("ScaffoldController");
const model = use("App/Models/User");

class UserController extends ScaffoldController {
  constructor() {
    super();
    this.resource = {
      model
    };
  }
}

module.exports = UserController;

```

#### Models

Example from Model extending ScaffoldModel:
The model need two functions required `static get hidden()`and `static get visible()`.

```
"use strict";

const ScaffoldModel = use("ScaffoldModel");

class User extends ScaffoldModel {
  static get hidden() {
    return ["id", "password", "created_at", "updated_at"];
  }
  static get visible() {
    return ["username", "email", "password"];
  }
}
module.exports = User;
```

##### Relationship

For relationship the function `static get with()` is required.
Example:

```
static get with(){
    return ['tokens']
}
```

##### Query override

Example:

```
async index(request) {
  this.data = await this.resource.model.first();
  return super.index(request);
}
```

#### Views ( Pending )

accessible_attributes:

```
{
    name: "name",
    type: "character"
}
```

##### Layout

##### Index

##### Create

##### Forms

#### Changelog

[CHANGELOG](CHANGELOG.md)

#### Credits

Thanks to the community of [AdonisJs](http://www.adonisjs.com/).
