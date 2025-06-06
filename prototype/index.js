function Animal(type, name) {
  this.type = type;
  this.name = name;
}

Animal.prototype.sayName = function () {
  console.log(`${this.name} is a ${this.type}`);
};

function Dog(name) {
  Animal.call(this, "dog", name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.bark = function () {
  console.log(`${this.name} is barking`);
};

// 팩토리 함수(클로저 활용)
const makeDog = (name, dogType) => {
  const obj = new Dog(name);

  const sayDogType = () => {
    console.log(`${obj.name} is a ${dogType}`);
  };

  return {
    sayName: () => obj.sayName(),
    bark: () => obj.bark(),
    sayDogType: sayDogType,
  };
};

const myDog = makeDog("face", "yorkshire terrier");

myDog.sayName(); // "face is a dog"
myDog.bark(); // "face is barking"
myDog.sayDogType(); // "face is a yorkshire terrier"
