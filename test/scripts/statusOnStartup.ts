import { Script } from "vnftjs";

const status = new Script();

status.funct = client => {
  client.user.setStatus("dnd");
};

export = status;
