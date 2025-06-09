export const checkPermission = () => {
  const userStorage = JSON.parse(localStorage.getItem("user"));

  if (
    userStorage.cargo === "Desenvolvedor" ||
    userStorage.cargo === "Diretor" ||
    userStorage.cargo === "Diretora"
  ) {
    return true;
  }

  return false;
};
