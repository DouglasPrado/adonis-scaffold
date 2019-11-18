# Adonis Scaffold
#### Getting Started
##### Installation
Install adonis-scaffold by running the below command.
```npm install adonis-scaffold --save```

##### Register providers.
Also add providers for the newly installed dependencies.
```
const providers = [
  'adonis-scaffold/providers/ScaffoldProvider'
];
```

##### Controllers
Controller example:
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

##### Models
Model example:
The model need two functions required ```static get hidden()```and ```static get visible()```.

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
###### Relationship
For relationship the function ```static get with()``` is required.
Example:
```
static get with(){
    return ['tokens']
}
```
