# vnft-commandhandler
Discord CommandHandler for TypeScript or JavaScript

## Table of Contents

* [Classes](#classes)
  * [CommandHandler](#commandhandler)
    - prefix
    - loadCommands(path)
    - loadScripts(path)
  * [Command](#command)
    - name
    - funct
    - addAlias(name)
  * [Script](#script)
    - funct
    - intervalTime
* [Examples](#examples)

## Class: CommandHandler
The extended discord.js Client

##### `prefix`
The prefix for the Commands, `.` is default 

##### `loadCommands(path)`
loads all exported Command-Instances of the given Path

##### `loadScripts(path)`
loads all exported Script-Instances of the given Path and triggers them after the Client had a successful login


## Class: Command
##### `name`
The main trigger for the command (without prefix)

##### `funct`
filled with an function with the parameters `(bot: Client, message: Message, args: string)`

##### `addAlias(name)`
Alternative Names for the Command which should trigger the `Command.funct`


## Class: Script
##### `funct`
filled with an function with the parameters `(bot: Client)`

##### `intervalTime`
time in ms in which it should be repeated  
(negative number disables the repeat, -1 is default value)


## Examples

#### JavaScipt
`
├── main.js
└── commands/
    ├── ping.js
    └── rickroll.js
`

```js
// main.js
const { CommandHandler } = require("vnft-commandhandler");
const path = require("path");

const client = new CommandHandler();
client.prefix = "!";

client.loadCommands(path.join(__dirname, "commands"));

client.login("Discord Token");
```
```js
// commands/ping.js
const { Command } = require("vnft-commandhandler");

const pingCommand = new Command();
pingCommand.name = "ping";
pingCommand.funct = (bot, message, args) => {
  message.reply("Pong!");
};

module.exports = pingCommand;
```
```js
// commands/rick.js
const { Command } = require("vnft-commandhandler");

const rick = new Command();
rick.name = "rick";
rick.addAlias("roll");
rick.funct = (bot, message, args) => {
  message.reply("https://youtu.be/dQw4w9WgXcQ");
};

module.exports = rick;
```

#### TypeScript
tbd