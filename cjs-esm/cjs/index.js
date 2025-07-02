const { createUser } = require("./users.js");
const madeUser = createUser("John", 1);
console.log(madeUser);

const { levelChangeUser } = require("./users.js");
levelChangeUser(madeUser.id, "up");
const { getUser } = require("./users.js");
console.log(getUser(madeUser.id));

levelChangeUser(madeUser.id, "down");
console.log(getUser(madeUser.id));

const { deleteUser } = require("./users.js");
deleteUser(madeUser.id);
console.log(getUser(madeUser.id));
