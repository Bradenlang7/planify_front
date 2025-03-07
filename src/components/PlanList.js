import { View, Text, StyleSheet, FlatList } from "react-native";
import PlanTile from "../components/PlanTile";

export default function PlanList({ headerText, planArray, handlePlanPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{headerText}</Text>
      {planArray.length > 0 ? (
        <FlatList
          data={planArray}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3} // Display 3 squares per row
          renderItem={({ item }) => (
            <PlanTile plan={item} onPress={handlePlanPress} />
          )}
          contentContainerStyle={styles.calendarGrid}
        />
      ) : (
        <Text style={styles.noPlansText}>No plans available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  calendarGrid: {
    alignItems: "center",
  },
  bannerButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#007BFF",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  noPlansText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 16,
  },
});
