export const convertToBlobObject = (image) => {
  // Convert base64 string to Blob object
  const byteCharacters = atob(image.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/jpeg" });
  return blob;
};

export function convertToBlobObjectPng(image) {
   // Convert base64 string to Blob object
   const byteCharacters = atob(image.split(",")[1]);
   const byteNumbers = new Array(byteCharacters.length);
   for (let i = 0; i < byteCharacters.length; i++) {
     byteNumbers[i] = byteCharacters.charCodeAt(i);
   }
   const byteArray = new Uint8Array(byteNumbers);
   const blob = new Blob([byteArray], { type: "image/png" });
   return blob;
}
