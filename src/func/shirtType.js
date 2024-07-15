export const getShirtType = (value) => {
    let shirt;
    switch (value) {
      case "1":
        shirt = "मेनीला";
        break;
      case "2":
        shirt = "Apple Cut";
        break;
      case "3":
        shirt = "Open Shirt";
        break;
      case "4":
        shirt = "3 Button Shirt";
        break;
      default:
        shirt = "";
    }
    return shirt;
  };