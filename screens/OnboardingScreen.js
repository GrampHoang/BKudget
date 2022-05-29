import { Image, StyleSheet, View , Button, Pressable, Text } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';

const backgroundColor = isLight => (isLight ? "#000000" : "#000000");
const color = isLight => backgroundColor(!isLight);

const Square = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? '#16B830' : '#CBE9CB';
  return (
    <View
      style={{
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Done = ({...props }) => (
  <Pressable {...props}>
    <Text style={styles.but}> Hoàn tất  </Text>
  </Pressable>
);

const Skip = ({...props }) => (
  <Pressable {...props}>
    <Text style={styles.but}> Bỏ qua </Text>
  </Pressable>
);

const Next = ({...props }) => (
  <Pressable {...props}>
    <Text style={styles.but}> Tiếp </Text>
  </Pressable>
);


const OnboardingScreen = ({navigation}) => (
  <Onboarding
    DotComponent={Square}
    NextButtonComponent={Next}
    SkipButtonComponent={Skip}
    DoneButtonComponent={Done}
    bottomBarColor = "#F6FFF6"
    onSkip={() => navigation.navigate("Login")}
    onDone={() => navigation.navigate("Login")}
    pages={[
      {
        backgroundColor: '#FBFFFB',
        image: <Image source={require('../assets/OB1.png')} />,
        title: 'BKudget',
        subtitle: 'Đề ra mục tiêu tài chính',
        titleStyles: styles.title,
        subTitleStyles: styles.des,
      },
      {
        backgroundColor: '#FBFFFB',
        image: <Image source={require('../assets/OB2.png')} />,
        title: 'BKudget',
        subtitle: 'Xem thống kê chi tiêu',
        titleStyles: styles.title,
        subTitleStyles: styles.des,
      },
      {
        backgroundColor: '#FBFFFB',
        image: <Image source={require('../assets/OB3.png')} />,
        title: 'BKudget',
        subtitle: "Nhiệm vụ hàng ngày",
        titleStyles: styles.title,
        subTitleStyles: styles.des,
      },
      {
        backgroundColor: '#FBFFFB',
        image: <Image source={require('../assets/OB4.png')} />,
        title: 'BKudget',
        subtitle: "So sánh với bạn bè",
        titleStyles: styles.title,
        subTitleStyles: styles.des,
      },
    ]}
  />
);

export default OnboardingScreen;

const styles = StyleSheet.create({
    title: {
        justifyContent: 'center',
        color: '#16B830',
        fontWeight: 'bold',
        fontSize: 30,
    },
    des:{
        justifyContent: 'center',
        color: '#1B1919',
        fontSize: 30,
        fontFamily: 'Roboto',
    },
    but:{
      justifyContent: 'center',
        color: '#1B1919',
        fontSize: 16,
        fontFamily: 'Roboto',
        marginLeft: 20,
        marginRight: 20,
    },
  });
  