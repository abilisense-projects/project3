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

async function remove(req, res) {
  try {
    const { therapistID, patientID } = req.query;
    const association = await AssociationService.removeAssociation(therapistID, patientID)
    if(association!=null){
      res.status(201).json(association);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


async function statusChangeToConfirmed(req, res) {
  try {
    const { id, receiverID } = req.body;
    const change = await AssociationService.markNotificationAsConfirmed(
      id,
      receiverID
    );
    res.json(change);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getlistOfAssociatedTherapist(req, res) {
  try {
    // const { receiverId } = req.body;
    const receiverId = req.params.receiverId;
    const therapists =
      await AssociationService.getlistTherapist(receiverId);
    res.json(therapists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deletingTherapistFromAssociations(req, res) {
  try {
    const { id, receiverID } = req.body;
    const deleting = await AssociationService.deletingTherapistOfPatient(
      id,
      receiverID
    );
    res.json(deleting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  create,
  remove,
  statusChangeToConfirmed,
  getlistOfAssociatedTherapist,
  deletingTherapistFromAssociations
};
