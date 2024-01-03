const AssociationService = require("../services/associationsService");

async function create(req, res) {
  try {
    const { therapistID, patientID } = req.body;
    const association = await AssociationService.createAssociation(therapistID, patientID)
    res.status(201).json(association);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  create,
};
