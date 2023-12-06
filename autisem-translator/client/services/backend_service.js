import axios from "axios"
const baseUrl = process.env.REACT_APP_API_KEY || "http://localhost:3000";
const backendService = {
    uploadRecording: (path, audioURI) => {
        try {
            console.log(`${baseUrl}/${path}`);
          const formData = new FormData();
          formData.append('audio', {
            uri: audioURI, 
            type: 'audio/mpeg', 
            name: 'audio.mp3',
            
          });
          const response =  axios.post(`${baseUrl}/${path}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          return response.data;
        } catch (error) {
          console.error('Error uploading recording', error);
          throw error;
        }
      },
    }


export default backendService;