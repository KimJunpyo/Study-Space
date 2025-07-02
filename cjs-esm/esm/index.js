import { createUser, levelChangeUser, getUser, deleteUser } from "./users.js";
const madeUser = createUser("John", 1);
console.log(madeUser);

levelChangeUser(madeUser.id, "up");
console.log(getUser(madeUser.id));

levelChangeUser(madeUser.id, "down");
console.log(getUser(madeUser.id));

deleteUser(madeUser.id);
console.log(getUser(madeUser.id));
