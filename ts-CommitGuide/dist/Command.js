"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(name, func) {
        this.name = name;
        this.func = func;
    }
    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    execute(bot, message, args) {
        console.log(`Executing "${this.name}" with args: "${args}"`);
        this.func(bot, message, args);
    }
}
exports.Command = Command;
