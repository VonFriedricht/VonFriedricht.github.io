"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(name, func) {
        this.name = name;
        this.func = func;
    }
    set name(name) {
        if (name.match(/^[A-Za-z0-9]+$/)) {
            this._name = name.toLowerCase();
        }
        else {
            let illegal_letters = name.replace(/[A-Za-z0-9]/g, "");
            throw `Commandname "${name}" must be /^[A-Za-z0-9]+$/, but found: "${illegal_letters}"`;
        }
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
