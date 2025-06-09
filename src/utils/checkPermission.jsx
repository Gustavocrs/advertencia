export const checkPermission = () => {
  if (typeof window !== "undefined") {
    const userStorage = JSON.parse(localStorage.getItem("user"));

    if (
      userStorage.cargo === "Desenvolvedor" ||
      userStorage.cargo === "Diretor" ||
      userStorage.cargo === "Diretora"
    ) {
      return true;
    }

    return false;
  }
};
