// for mobile- 380 pixel width min everything should work

export const getScreenSize = () => {
  // phone and table have same UI
  let screen = window.innerWidth;
  if (typeof window !== "undefined" && screen < 768) {
    return "phone";
  } 
  else if (typeof window !== "undefined" && screen >= 768 && screen < 992) {
    return "tablet";
  } 
  else if (typeof window !== "undefined" && screen >= 992) {
    return "pc";
  }
  // else if (typeof window !== "undefined" && screen <= 417) {
  //   // small device
  //   return "sd";
  // }
};

export const getScreenWidth = () => {
  let screen;
  if (typeof window !== "undefined") {
    screen = window.innerWidth;
  }

  return screen;
};

const deviceWidth = {
  MOBILE: 700,
}

export const isPhoneActive = getScreenWidth() <= deviceWidth.MOBILE;
