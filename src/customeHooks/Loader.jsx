import { useState } from "react";

const useLoader = () => {
  const [spinning, setSpinning] = useState(false);
  const [percent, setPercent] = useState(0);

  const showLoader = () => {
    setSpinning(true);
    let ptg = -10;
    const interval = setInterval(() => {
      ptg += 5;
      setPercent(ptg);
      if (ptg > 120) {
        clearInterval(interval);
        setSpinning(false);
        setPercent(0);
      }
    }, 100);
  };

  return { spinning, setSpinning,  percent, setPercent, showLoader };
};


export default useLoader;