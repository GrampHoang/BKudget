import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import { dailyMission } from "../data/missionDaily";
import { monthMission } from "../data/missionMonth";
import Mission from "../components/MissionScreen/Mission";
import Header from "../components/Header.js";
import React from "react";

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
          <Image source={require('../assets/left-arrow.png')} style={styles.leftimage}/>
          <Text style={styles.missionHeader}>{missionType}</Text>
          <Image source={require('../assets/right-arrow.png')} style={styles.rightimage} />
        </View>
      </TouchableOpacity>
      <ScrollView>
        {missionList.map((mission) => 
    <Mission key={mission.id} finished={mission.finished}
    content={mission.content}
            description={mission.description}
          point={mission.point}
          />
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
  },
  headercontent: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    padding: 8,
    margin: 0,
    flexDirection: 'row',

  },
  missionHeader: {
    marginLeft: "auto",
    fontSize: 28,
  },
  leftimage: {

  },
  rightimage: {
    marginLeft: 'auto',

  }
});
