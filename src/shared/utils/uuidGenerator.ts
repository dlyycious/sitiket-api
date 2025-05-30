import { v7, type Version7Options } from "uuid";

const options: Version7Options = {
  msecs: new Date("2002-12-12").getTime(),
};

export const generateUUID = (): string => {
  return v7(options);
};
