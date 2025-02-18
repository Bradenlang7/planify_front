import React, { useState, useEffect } from "react";
import fetchPlanDetails from "../api/plans/fetchPlanDetails";
import { useNavigation } from "@react-navigation/native";
import deletePlan from "../api/plans/deletePlan";
import DeleteButton from "../components/DeleteButton";
import SubmitButton from "../components/SubmitButton";
import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { queryClient } from "../utils/QueryClient";

export default function EditSinglePlanScreen({ route }) {
  const { planId = null } = route.params || {};

  const headerTitle = route?.params?.title || "Create Plan"; //if coming from EditPlansScreen title is set to "Edit Plan"

  // Initialize with the current date and time in ISO 8601 format for testing
  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState(new Date().toISOString()); // Default to current time
  const [endTime, setEndTime] = useState(
    new Date(new Date().getTime() + 60 * 60 * 1000).toISOString() // Default to 1 hour later
  );
  const [invitees, setInvitees] = useState(null);

  useEffect(() => {
    if (!planId) return;

    const fetchPlan = async () => {
      try {
        const response = await fetchPlanDetails(planId);
        const plan = response.data;
        console.log(plan);
        setTitle(plan.title);
        setDescription(plan.description);
        setLocation(plan.location);
        setStartTime(plan.startTime);
        setEndTime(plan.endTime);
        setInvitees(plan.approvals);
      } catch (error) {
        console.error("Failed to fetch plan details:", error);
      }
    };

    fetchPlan();
  }, [planId]);

  const navigation = useNavigation();

  //function to handle the delete button press.
  const handleDelete = async () => {
    try {
      await deletePlan(planId);
      queryClient.invalidateQueries(["approvedPlans"]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.title}>{headerTitle}</Text>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          multiline
        />
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter location"
        />
        <Text style={styles.label}>Start Time</Text>
        <TextInput
          style={styles.input}
          value={startTime}
          onChangeText={setStartTime}
          placeholder="Enter start time (e.g., 2024-12-22T15:00)"
        />
        <Text style={styles.label}>End Time</Text>
        <TextInput
          style={styles.input}
          value={endTime}
          onChangeText={setEndTime}
          placeholder="Enter end time (e.g., 2024-12-22T17:00)"
        />
        {planId ? (
          <>
            <DeleteButton
              onPressFunction={handleDelete}
              navRoute={"EditPlansScreen"}
            />
            <SubmitButton
              onPressFunction={() => {
                const planObject = {
                  title,
                  description,
                  location,
                  startTime,
                  endTime,
                  invitees,
                };
                navigation.navigate("AddInvitees", {
                  planObject,
                  buttonTxt: "Edit Invitees",
                });
              }}
              text="Edit Invitees"
            />
          </>
        ) : (
          <SubmitButton
            onPressFunction={() => {
              const planObject = {
                title,
                description,
                location,
                startTime,
                endTime,
              };
              navigation.navigate("AddInvitees", {
                planObject,
                buttonText: "Save Plan!",
              });
            }}
            text="Add Invitees"
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
