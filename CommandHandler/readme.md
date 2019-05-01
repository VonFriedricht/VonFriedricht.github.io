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
time in ms in which it should be repeated (negative number disables the repeat, -1 if no interval set)


## Examples

*wip*
