import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#CCCCCC',
  },
  body: {
    backgroundColor: '#F4F4F4',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
  },
});

const App = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <Text style={styles.title}>Welcome</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  </>
);

export default App;
