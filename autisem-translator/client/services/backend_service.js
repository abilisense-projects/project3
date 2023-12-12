import axios from "axios"
const baseUrl = process.env.REACT_APP_API_KEY || "http://localhost:3000";
const backendService = {
  uploadRecording: (path, audioURI) => {
    const audioBlob =  fetch(audioURI).then((r) => r.blob());
    const audioFile = new File([audioBlob], 'audio.mp3', { type: 'audio/mp3' });
    // console.log('type', typeof (audioFile));
    // console.log('arrayBuffer', audioFile.arrayBuffer);
    console.log(audioBlob);
    try {
      console.log(`${baseUrl}/${path}`);
      const formData = new FormData();
      console.log(audioFile);
      formData.append('audio', audioFile);
      const response = axios.post(`${baseUrl}/${path}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error('Error uploading recording', error);
      throw error;
    }
  },
}


export default backendService;