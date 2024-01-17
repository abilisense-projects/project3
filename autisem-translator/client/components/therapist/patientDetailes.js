import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import therapistService from '../../services/backendServices/therapistService';

//should this be a page?
const PatientDetails = ({ route }) => {
  const { patientId } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchData();
  }, [patientId]);

// Fetch patient details using patientId
const fetchData = async () => {
    try {
      const detailes = await therapistService.getPatientsDetailes('657b28f87a856eacb4662c20');
      console.log("detailes",detailes)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
      <Text>Patient Details Screen</Text>
      )}
    </View>
  );
};

export default PatientDetails;
