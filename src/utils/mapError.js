const errorMapping = (codeError) => {
  let message;
  switch (codeError) {
    case 400:
      message = "Veuillez vérifier votre saisie et réessayer";
      break;
    case 401:
      message = "Les informations d'identification sont incorrectes. Veuillez réessayer!";
      break;
    case 409:
      message = "Il y a un utilisateur avec les mêmes informations d'identification. Veuillez réessayer!";
      break;
    default:
      message = "Une erreur s'est produite. Veuillez réessayer!";
      break;
  }
  return message;
};

export default errorMapping;
