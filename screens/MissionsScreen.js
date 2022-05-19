import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { dailyMission } from "../data/missionDaily";
import { monthMission } from "../data/missionMonth";
import Mission from "../components/MissionScreen/Mission";
import Header from "../components/Header.js";
import React from "react";
import { COLORS } from "../constants/themes";


export default function MissionsScreen() {
  const [daily, setDaily] = React.useState(true);
  const [missionList, setMissionList] = React.useState(dailyMission);
  const [missionType, setMissionType] = React.useState("Nhiệm vụ hằng ngày");
  // default mission page content

  
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} />
      <Header />
      {/* Change to another mission page when press */}
      <TouchableOpacity
        onPress={() => [
          setDaily(!daily),
          setMissionType(daily ? "Nhiệm vụ tháng" : "Nhiệm vụ hằng ngày"),
          setMissionList(daily ? monthMission : dailyMission)
        ]}
      >
        <View style={styles.headercontent}>
          <Text style={styles.missionHeader}> &#60; {missionType} &#62;</Text>
        </View>
      </TouchableOpacity>
      <ScrollView>
        {missionList.map((mission) => 
    <Mission key={mission.id} finished={mission.finished}
    content={mission.content}
    description={mission.description}/>
  )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: "#16B830",
  },
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: COLORS.verylightgray,
  },
  headercontent: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 8,
    margin: 0,
  },
  missionHeader: {
    alignSelf: "center",
    fontSize: 28,

    // fontWeight: '900',
  },
});
