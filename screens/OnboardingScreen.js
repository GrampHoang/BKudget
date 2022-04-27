import { Image, StyleSheet, Text } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({navigation}) => (
  <Onboarding
    onSkip={() => navigation.navigate("Login")}
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
        subtitle: 'Xem lại thống kê chi tiêu',
        titleStyles: styles.title,
        subTitleStyles: styles.des,
      },
      {
        backgroundColor: '#FBFFFB',
        image: <Image source={require('../assets/OB3.png')} />,
        title: 'BKudget',
        subtitle: "Làm nhiệm vụ hàng ngày",
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
    }
  });
  