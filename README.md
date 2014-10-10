# ngCreate

Opinionated CLI to create AngularJS files

## How install
For install this CLI tool you need to write in your terminal:

```
sudo npm install -g ngcreate
```

## Usage
Once installed, you only need to do:

```
ng:create [options] [command]
```

### Options

```
-h, --help     output usage information
-V, --version  output the version number
--path [path]  set path to create the file
```

The [path] is a string (with or without quotes) who set the relative rute where the file are going to be created, this path prevents the creation of a unique folder for the modules.

### Commands

```
module
  Create a new AngularJS's module

controller
  Create a controller for specified module

directive
  Create a directive for specified module
```

#### ng:create module
This command init a prompt questions about the module name, dependencies and description.

When end create a JS file with the module name in the path specified via options or in './front/modules/:module' where :module is the module name.

#### ng:create controller
This command init a prompt questions about the module name and controller name, dependencies and description.

When end check if the module exist, if not create a JS file with the module name in the path specified via options or in './front/modules/:module' where :module is the module name and put the controller in that file, else if exist added the controller at the end.

#### ng:create directive
This command init a prompt questions about the module name and directive name, restrict, controller, template and description.

When end check if the module exist, if not create a JS file with the module name in the path specified via options or in './front/modules/:module' where :module is the module name and put the directive in that file, else if exist added the directive at the end.