import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import Mission from "../components/MissionScreen/Mission";
import React, {useState, useEffect} from 'react';
import { storeMissionData, resetDaily, setFirstDay} from "../data/localmission";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
// import { pleple } from "../data/localmission";
// import { completeMonthMission } from "../data/localmission";
export default function MissionsScreen() {
  storeMissionData();
  setFirstDay();
  // pleple();
  // completeMonthMission(1);

  const [daily, setDaily] = useState(true);
  const [missionList, setMissionList] = useState([]);
  const [dailymission, setDailymission] = useState([]);
  const [monthmission, setMonthmission] = useState([]);
  const [missionType, setMissionType] = useState("Nhiệm vụ hằng ngày");
  // default mission page content
  useEffect(() => { 
      getMission(),
      resetDaily()
  }, []);
  const isFocused = useIsFocused();
  useEffect(() => { 
    if (!isFocused) {
        getMission()
    }
  }, [isFocused]);
  
  async function getMission() {
    try {
      const dailIn = await AsyncStorage.getItem('@DailyMission')
      const dail = JSON.parse(dailIn);
      setDailymission(dail);
      setDaily(true);
      setMissionType("Nhiệm vụ hằng ngày");
      setMissionList(dail);
      const monthIn = await AsyncStorage.getItem('@MonthMission')
      const month = JSON.parse(monthIn);
      setMonthmission(month);
    } catch (e) {    
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} />
      {/* Change to another mission page when press */}
      <TouchableOpacity
        onPress={() => [
          setDaily(!daily),
          setMissionType(daily ? "Nhiệm vụ tháng" : "Nhiệm vụ hằng ngày"),
          setMissionList(daily ? monthmission : dailymission)
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
