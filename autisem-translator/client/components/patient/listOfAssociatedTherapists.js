import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import patientService from "../../services/backendServices/patientService";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import BannerNotification from "../shared/bannerNotification";
import { translationService } from "../../services/translationService";
const translate = translationService.translate;

export default function ListOfAssociatedTherapists() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [Therapists, setTherapists] = useState([]);
  const [bannerMessage, setBannerMessage] = useState(null);

  const receiverId = useSelector((state) => state.user.user.userData._id);

  //gets therapists list by receiver id
  useEffect(() => {
    fetchData();
  }, [receiverId]);

  const fetchData = async () => {
    try {
      const responseTherapist =
        await patientService.getlistOfAssociatedTherapist(receiverId);
      if (responseTherapist && responseTherapist.therapists) {
        setTherapists(responseTherapist.therapists);
      } else {
        console.error("Invalid response data:", responseTherapist);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    // Display a loading indicator while the data is being fetched
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  const handleTherapist = (therapists) => {
    setSelectedTherapist(therapists);
  };

  const handleTrash = async () => {
    if (selectedTherapist) {
      const { userName, firstName, lastName, id, phoneNumber } = selectedTherapist;
      const therapistData = { userName, firstName, lastName, id,phoneNumber };
      const responseDelete = await patientService.deletingTherapist({
        id: id,
        receiverID: receiverId,
      });
      setBannerMessage(
        `${translate("Therapist")} ${firstName} ${lastName} ${translate("Deleted successfully")}`
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        {Therapists.length > 0 && (
          <Text style={styles.label}>{translate("my Therapists")}</Text>
        )}
        {Therapists.length === 0 ? (
          <View style={styles.noPatientsContainer}>
            <Text style={styles.noPatientsText}>{translate("you do not yet have therapist")} {`\n`}{translate("associated with you")}</Text>
          </View>
        ) : (
          <View>
            {Therapists.map((therapist) => (
              <Pressable
                key={therapist.userName}
                onPress={() => handleTherapist(therapist)}
                style={[
                  styles.button,
                  selectedTherapist === therapist && {
                    backgroundColor: "green",
                  },
                ]}
              >
                <View style={styles.IconContainer}>
                  <View style={styles.Icon}>
                    <Icon
                      name="user-md"
                      size={30}
                      color={
                        selectedTherapist === therapist ? "white" : "green"
                      }
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text
                      style={{
                        color:
                          selectedTherapist === therapist ? "white" : "green",
                      }}
                    >
                      {therapist.firstName} {therapist.lastName}
                      
                    </Text>
                    <Text
                      style={{
                        color:
                          selectedTherapist === therapist ? "white" : "green",
                      }}
                    >
                      {therapist.phoneNumber}
                    </Text>
                    <Text
                      style={{
                        color:
                          selectedTherapist === therapist ? "white" : "green",
                      }}
                    >
                      {therapist.userName}
                    </Text>
                  </View>
                  <View style={styles.Icon}>
                    <Pressable onPress={handleTrash}>
                      <Icon
                        name="trash"
                        size={27}
                        color={
                          selectedTherapist === therapist ? "white" : "green"
                        }
                      />
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}
        {bannerMessage && (
          <BannerNotification
            message={bannerMessage}
            severity={bannerMessage.includes("Failed") ? "error" : "success"}
            onClose={() => {
              setBannerMessage(null), fetchData();
            }}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  label: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },

  IconContainer: {
    marginRight: 8,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: 8,
  },
  noPatientsText: {
    fontSize: 18,
    marginBottom: 16,
  },
  noPatientsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  Icon: {
    marginLeft: 8,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
