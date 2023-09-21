import {getMember} from "./script.js";

export function construct(originalData) {
  const resultObject = {
    id: originalData.id,
    member: getMember(originalData.memberId), 
    date: new Date(originalData.date),
    discipline: originalData.discipline, 
    type: originalData.resultType,
    
    getTimeString() {
      const min = Math.floor(this.time / 1000 / 60);
      const sec = Math.floor(this.time / 1000) - min * 60;
      const millis = this.time - (min * 60 + sec) * 1000;
      return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${(millis / 10).toString().padStart(2, "0")}`;
    },
    setTimeString(timestring) {
      const parts = timestring.split(/[:.]/);
      const min = Number(parts[0]);
      const sec = Number(parts[1]);
      const millis = Number(parts[2]);

      this.time = (min * 60 + sec) * 1000 + millis * 10;
    },
    get isTraining() {
      return this.type === "training"
    },
    get isCompetition() {
      return this.type === "competition"
    }

  };

  Object.defineProperty(resultObject, "id", {
    configurable: false,
    writable: false
  });

  Object.defineProperty(resultObject, "getTimeString", {
    enumerable: false
  });

  Object.defineProperty(resultObject, "setTimeString", {
    enumerable: false
  });

  // When done creating the object, set the TimeString from the JSON
  resultObject.setTimeString(originalData.time);

  return resultObject;
}
