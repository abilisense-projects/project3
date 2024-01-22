
const ImageService = {

  encode: async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.log('Error encoding image', error);
      throw error;
    }
  },

  //for now i dont need it does nothing
  decode: (encodedImage) => {
    try {
      const decodedImage = encodedImage;
      return decodedImage;
    } catch (error) {
      console.log('Error decoding image', error);
      throw error;
    }
  },
};

export default ImageService;
