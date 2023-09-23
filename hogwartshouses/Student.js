export function construct(jsonObject) {
  const Student = {
    firstName: undefined,
    middleName: undefined,
    lastName: undefined,
    get fullName() { 
      if( this.hasMiddleName() ) {
        return `${this.firstName} ${this.middleName} ${this.lastName}`;
      } else {
        return `${this.firstName} ${this.lastName}`;
      }
    },
    setFullName(fullname) {
      const firstSpace = fullname.indexOf(" ");
      const lastSpace = fullname.lastIndexOf(" ");

      this.firstName = fullname.substring(0, firstSpace);
      this.lastName = fullname.substring(lastSpace+1);
      if( lastSpace > firstSpace ) {
        this.middleName = fullname.substring(firstSpace+1, lastSpace);
      } else {
        this.middleName = "";
        // Note: Sort doesn't work with properties that can become undefined ... so we always define no middlename as ""
      }
    },
    hasMiddleName() {
      return this.middleName != "";
    },

    gender: jsonObject.gender,

    set house(house) {
      if( house === "Gryffindor" || house === "Ravenclaw" || house === "Slytherin" || house === "Hufflepuff" ) {
        this._house = house;
      } else {
        console.warn("Unknown house name: " + house);
      }
    },
    get house() {
      return this._house;
    }
  }

  Student.setFullName(jsonObject.fullname);
  Student.house = jsonObject.house;

  return Student;
}