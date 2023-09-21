export function construct(originalData) {
  const resultObject = {
    id: originalData.id,
    member: originalData.memberId, // TODO: Make actual member
    date: new Date(originalData.date),
    discipline: originalData.discipline, // TODO: Make unique type
    type: originalData.resultType,
    //      time: originalData.time,        // TODO: Make milliseconds
    getTimeInMilliseconds() {
      return this.time;
    },
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
    isTraining() {
      return this.type === "training"
    },
    isCompetition() {
      return this.type === "competition"
    }

  };

  // When done creating the object, set the TimeString from the JSON
  resultObject.setTimeString(originalData.time);

  return resultObject;
}
