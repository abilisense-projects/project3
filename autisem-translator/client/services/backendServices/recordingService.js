import axios from "axios"
const baseUrl = process.env.REACT_APP_API_KEY || "http://localhost:3000";
const backendService = {
  uploadRecording: (path, audioURI, patientID, translation) => {
    /* this function is used to upload the recording to the server.
    params:
    path - the path of the route in the server
    audioURI - the audio file to upload
    patientID - the patient ID
    translation - the translation of the recording
    */
    const audioFile = new File([audioURI], 'recording.wav', {
      type: 'audio/wav',
    });
    try {
      const formData = new FormData();
      formData.append('recording', audioFile);
      formData.append('patientID', patientID);
      formData.append('translation', translation);
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