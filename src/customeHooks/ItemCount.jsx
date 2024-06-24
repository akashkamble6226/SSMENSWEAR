import { useState } from "react";

const useItemCount = () => {
  const [toggleCountPant, setToggleCountPant] = useState(1);
  const [toggleCountShirt, setToggleCountShirt] = useState(1);

  const changeCount = (increase, type) => {
    if (increase) {
      switch (type) {
        case "shirt":
          setToggleCountShirt(toggleCountShirt + 1);
          break;
        case "pant":
          setToggleCountPant(toggleCountPant + 1);
          break;
        default:
      }
    } else {
      switch (type) {
        case "shirt":
          if (toggleCountShirt !== 1) {
            setToggleCountShirt(toggleCountShirt - 1);
          }
          break;
        case "pant":
          if (toggleCountPant !== 1) {
            setToggleCountPant(toggleCountPant - 1);
          }
          break;
        default:
      }
    }
  };

  return {
    changeCount,
    toggleCountPant,
    setToggleCountPant,
    toggleCountShirt,
    setToggleCountShirt,
  };
};

export default useItemCount;
