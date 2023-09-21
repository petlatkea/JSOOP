
export function construct(memberdata) {
  const MemberObject = {
    id: memberdata.id,
    firstName: memberdata.firstName,
    lastName: memberdata.lastName,
    get name() {
      return this.firstName + " " + this.lastName
    },
    active: memberdata.isActiveMember,
    competitive: memberdata.isCompetitive,
    birthday: new Date(memberdata.dateOfBirth),
    email: memberdata.email,
    gender: memberdata.gender,
    image: memberdata.image,
    hasPayed: memberdata.hasPayed,
    get age() {
      const diff = Date.now() - this.birthday.getTime();
      const years = Math.floor(diff/1000/60/60/24/365);
      return years;
    },
    get isJunior() {
      return this.age < 18;
    },
    get isSenior() {
      return this.age >= 18;
    }
  }

  Object.defineProperty(MemberObject, "id", {
    configurable: false,
    writable: false
  });

  Object.defineProperty(MemberObject, "name", {
    enumerable: false
  });
  
  Object.defineProperty(MemberObject, "image", {
    enumerable: false
  });


  return MemberObject;
}