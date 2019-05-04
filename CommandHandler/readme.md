# vnft-commandhandler
Discord CommandHandler for TypeScript or JavaScript

## Table of Contents

* [Classes](#classes)
  * [CommandHandler](#class-commandhandler)
    - [prefix](#prefix)
    - [loadCommands(path)](#loadcommandspath)
    - [loadScripts(path)](#loadscriptspath)
  * [Command](#class-command)
    - [name](#name)
    - [funct](#funct)
    - [addAlias(name)](#addaliasname)
  * [Script](#class-script)
    - [funct](#funct-1)
    - [intervalTime](#intervaltime)
* [Examples](#examples)
    - [JavaScript](#javascipt)
    - [TypeScript](#typescript)

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
(negative numbers are disabling the repeat, -1 is the default value)


## Examples

### **JavaScipt**
#### Structure for this example
```
.
├── main.js
├── commands/
│   ├── ping.js
│   └── rickroll.js
└── scripts/
    ├── tbd
    └── tbd
``` 
#### Code
##### main.js
```js
const { CommandHandler } = require("vnft-commandhandler");
const path = require("path");

const client = new CommandHandler();
client.prefix = "!";

client.loadCommands(path.join(__dirname, "commands"));

client.login("Discord Token");
```

##### commands/ping.js
```js
const { Command } = require("vnft-commandhandler");

const pingCommand = new Command();
pingCommand.name = "ping";
pingCommand.funct = (bot, message, args) => {
  message.reply("Pong!");
};

module.exports = pingCommand;
```

##### commands/rickroll.js
```js
const { Command } = require("vnft-commandhandler");

const rick = new Command();
rick.name = "rick";
rick.addAlias("roll");
rick.funct = (bot, message, args) => {
  message.reply("https://youtu.be/dQw4w9WgXcQ");
};

module.exports = rick;
```

### **TypeScript**
#### Structure for this example:
``` 
src/
├── main.ts
├── commands/
│   ├── ping.ts
│   └── rickroll.ts  
└── scripts/
    ├── tbd
    └── tbd
``` 
#### Code

##### main.ts
```ts
import { CommandHandler } from "vnft-commandhandler";
import * as path from "path";

const client = new CommandHandler();
client.prefix = "!";

client.loadCommands(path.join(__dirname, "commands"));

client.login("Discord Token");
```

##### commands/ping.ts
```ts
import { Command } from "vnft-commandhandler";
import { Client, Message } from "discord.js";

const ping = new Command();
ping.name = "ping";
ping.funct = (bot: Client, message: Message, args: string) => {
  message.reply("Pong");
};

module.exports = ping;
```

##### commands/rickroll.ts
```ts
import { Command } from "vnft-commandhandler";
import { Client, Message } from "discord.js";

const rick = new Command();
rick.name = "rick";
rick.addAlias("roll");
rick.funct = (bot: Client, message: Message, args: string) => {
  message.reply("https://youtu.be/dQw4w9WgXcQ");
};

module.exports = rick;
```
