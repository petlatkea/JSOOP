import fs from "fs/promises"

function constructNameParts(fullName) {
  const nameParts = {
    firstName: undefined,
    middleName: undefined,
    lastName: undefined,
    setFullName(fullName) {
      const parts = fullName.split(" ");
      this.firstName = parts[0];
      this.lastName = parts[parts.length-1];
      if(parts.length > 2) {
        this.middleName = parts[1];
      }
    },
    getFullName() {
      if(this.hasMiddleName()) {
        return this.firstName + " " + this.middleName + " " + this.lastName;
      } else {
        return this.firstName + " " + this.lastName;
      }
    },
    hasMiddleName() {
      return this.middleName !== undefined;
    }
  }
  if(fullName) {
    nameParts.setFullName(fullName);
  }
  return nameParts;
}

/*
const harry = constructNameParts("Harry James Potter");
const ron = constructNameParts("Ronald Weasley");

// harry.setFullName("Harry James Potter");
// ron.setFullName("Ronald Weasley");

console.log(`first: ${harry.firstName}`);
console.log(`middle: ${harry.middleName}`);
console.log(`last: ${harry.lastName}`);

console.log(`Full name: ${harry.getFullName()}`);

ron.setFullName("Ronald Weasley");
console.log(`first: ${ron.firstName}`);
console.log(`middle: ${ron.middleName}`);
console.log(`last: ${ron.lastName}`);

console.log(`Full name: ${ron.getFullName()}`);
*/

async function fetchStudents() {
  const rawdata = await fs.readFile("data.json");
  const jsondata = JSON.parse(rawdata);
  return jsondata;
}


async function buildObjectArray() {
  const studentNames = [];

  const originalData = await fetchStudents();
  for(const student of originalData) {
    const nameparts = constructNameParts(student.fullname);
    studentNames.push(nameparts)
  }

  return studentNames;
}


function displayStudentNames(studentNames) {
  for(const namep of studentNames) {
    console.log(`first: ${namep.firstName} - middle: ${namep.middleName} - last: ${namep.lastName}`);
    console.log(`full name: ${namep.getFullName()}`);
    console.log("-------------------------------------------")
  }
}


async function main() {
  const names = await buildObjectArray();
  displayStudentNames(names);
}

main();
