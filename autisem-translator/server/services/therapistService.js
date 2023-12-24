// therapistService.js

const therapistRepository = require('../repositories/therapistRepository');

const therapistService = {
    async createTherapist(userName, firstName, lastName, phoneNumber, password, listOfPatients) {
        try {
            const createdTherapist = await therapistRepository.createTherapist(
                userName,
                firstName,
                lastName,
                phoneNumber,
                password,
                listOfPatients
            );

            return { success: true, therapist: createdTherapist };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Failed to create therapist' };
        }
    },

    async getTherapist(userName) {
        try {
            const fetchedTherapist = await therapistRepository.getTherapist(userName);
            if (!fetchedTherapist.success) {
                return { success: false, message: 'Failed to retrieve therapist' };
            }
            return { success: true, therapist: fetchedTherapist.therapist };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Internal server error' };
        }
    },

    async checkUserNameExists(userName) {
      try {
          const userNameExists = await therapistRepository.checkUserNameExists(userName);
          return userNameExists;
      } catch (error) {
          console.error(error);
          return { success: false, message: 'Internal server error' };
      }
  },
};

module.exports = therapistService;
