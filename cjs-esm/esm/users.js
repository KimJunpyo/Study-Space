let users = [];

const createUser = (name, level = 1) => {
  const newUser = { id: users.length + 1, name, level };
  users.push(newUser);

  return newUser;
};

const getUser = (id) => {
  const findUser = users.find((user) => user.id === id);
  if (!findUser) {
    return "User not found";
  }
  return findUser;
};

const levelChangeUser = (id, type) => {
  switch (type) {
    case "up":
      users.find((user) => user.id === id).level++;
      break;
    case "down":
      users.find((user) => user.id === id).level--;
      break;
  }
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== id);
};

export { createUser, getUser, levelChangeUser, deleteUser };
