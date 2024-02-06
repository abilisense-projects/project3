import axios from "axios"
const baseUrl = process.env.REACT_APP_API_KEY || "http://localhost:3000";
const backendService = {
  uploadRecordings: async (path, audioURIs, patientID, translation) => {
    if (!audioURIs.length) {
      throw new Error('No recordings to upload.');
    }
    const formData = new FormData();
    for (let i = 0; i < audioURIs.length; i++) {
      const audioURI = audioURIs[i];
      const audioBlob = await fetch(audioURI).then(r => r.blob());
      const audioFile = new File([audioBlob], `audiofile-${i}.mp3`, { type: 'audio/mpeg' });
      formData.append('recordings[]', audioFile);
    }
    formData.append('patientID', patientID);
    formData.append('translation', translation);
    try {
      const response = await axios.post(`${baseUrl}/${path}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error('Error uploading recordings', error);
      throw error;
    }}
 ,
 translateWord:async(audioFile)=> {
  try {
    const formData = new FormData();

    const audioURI = audioFile; 
    const audioBlob = await fetch(audioURI).then(r => r.blob());
    const audio = new File([audioBlob], `audiofile.mp3`, { type: 'audio/mpeg' });

    formData.append('audio', audio);
    const response = await axios.post(`${baseUrl}/words/translateAi`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.translation;
  } catch (error) {
    console.error('Error translating word using AI:', error);
    throw error;
  }
}
}

export default backendService;