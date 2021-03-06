![npm Downloads](https://img.shields.io/npm/dt/vnft-commandhandler.svg)  
##### This is a bare bones version of [vnftjs](https://www.npmjs.com/package/vnftjs)  

# vnft-commandhandler
Discord CommandHandler for TypeScript or JavaScript

## Table of Contents

* [Classes](#class-commandhandler)
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
    - [interval](#interval)
* [Examples](#examples)
    - [JavaScript](#javascipt)
    - [TypeScript](#typescript)

## Class: CommandHandler
the extended discord.js Client

##### `prefix`
the prefix for the commands, `.` is set by default.

##### `loadCommands(path)`
loads all exported command instances of the specified path.

##### `loadScripts(path)`
loads all exported script instances of the specified path and triggers them after the client has successfully logged in.


## Class: Command
##### `name`
the main trigger for the command (without prefix)  

##### `funct`
the function that gets triggered with the call of the command.  
parameters: `(client: Client, message: Message, args: string)`  
  
**Client:** the discord client ( extended with the commandhandler )   
**Message:** the message that triggered the command   
**args:** the entire string after the commandname (e.g. .help ping → args:"ping")   

##### `addAlias(name)`
alternative names for the command, which should also trigger it.  

## Class: Script
##### `funct`
the function that gets executed after the client has successfully logged in.  
parameters: `(bot: Client)`  
  
**Client:** the discord client ( extended with the commandhandler )  

##### `interval`
time in ms in which the script-function should be repeated  
(negative numbers are disabling the repeat, -1 is the default value)  


## Examples

### **JavaScipt**
#### Structure for this example
```
.
├── main.js
├── commands/
│   ├── ping.js
│   ├── neko.js
│   └── setActivity.js
└── scripts/
    ├── startAsDnd.js
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
client.loadCommands(path.join(__dirname, "scripts"));

client.login("Discord Token");
```

##### commands/ping.js
```js
const { Command } = require("vnft-commandhandler");

const pingCommand = new Command();
pingCommand.name = "ping";

pingCommand.funct = (client, message, args) => {
  message.reply("Pong!");
};

module.exports = pingCommand;
```

##### commands/neko.js
```js
const { Command } = require("vnft-commandhandler");
const axios = require("axios");

const neko = new Command();
neko.name = "neko";
neko.addAlias("cat");

neko.funct = async (client, message, args) => {
  var meow = await axios.get("http://aws.random.cat/meow");
  message.reply(meow.data.file);
};

module.exports = neko;
```

##### commands/activity.js
```js
const { Command } = require("vnft-commandhandler");

const activity = new Command();
activity.name = "setActivity";
activity.addAlias("activity");

activity.funct = async (client, message, args) => {
  await client.user.setActivity(args);
  message.reply(`Status Updated`);
};

module.exports = activity;
```

##### scripts/startAsDnd.js
```ts
const { Script } = require("vnft-commandhandler");

const status = new Script();

status.funct = client => {
  client.user.setStatus("dnd");
}

module.exports = status;
```

### **TypeScript**
#### Structure for this example:
``` 
src/
├── main.ts
├── commands/
│   ├── ping.ts
│   ├── neko.ts
│   └── setActivity.ts
└── scripts/
    ├── startAsDnd.ts
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
client.loadCommands(path.join(__dirname, "scripts"));

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

export = ping;
```

##### commands/neko.ts
```ts
import { Command } from "vnft-commandhandler";
import { Client, Message } from "discord.js";
import axios from "axios";

const neko = new Command();
neko.name = "neko";
neko.addAlias("cat");

neko.funct = async (bot: Client, message: Message, args: string) => {
  let meow = await axios.get("http://aws.random.cat/meow");
  message.reply(meow.data.file);
};

export = neko;
```

##### commands/setActivity.ts
```ts
import { Command } from "vnft-commandhandler";
import { Client, Message } from "discord.js";

const activity = new Command();
activity.name = "setActivity";
activity.addAlias("activity");

activity.funct = async (bot: Client, message: Message, args: string) => {
  await bot.user.setActivity(args);
  message.reply(`Activity Updated!`);
};

export = activity;
```

##### scripts/startAsDnd.ts
```ts
import { Script } from "vnft-commandhandler";

const status = new Script();

status.funct = client => {
  client.user.setStatus("dnd");
}

export = status;
```
