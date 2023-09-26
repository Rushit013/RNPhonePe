import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  NativeModules,
  NativeEventEmitter,
  StyleSheet,
} from 'react-native';

const ReactPhonePe =
  Platform.OS === 'ios'
    ? null
    : new NativeEventEmitter(NativeModules.ReactPhonePe);

const App = () => {
  async function getUpiListToRN() {
    if (Platform.OS == 'android') {
      const upis = await NativeModules.ReactPhonePe.getUpiListToRN();
      console.log('--- getUpiListToRN', upis);
    } else {
    }
  }

  function startPhonePe() {
    const URL =
      'upi://pay?pa=MERCHANTUAT@ybl&pn=MERCHANT&am=1&mam=1&tr=f304fea0a62644f5907f1072734741&tn=Payment%20for%20f304fea0a62644f5907f1072734741&mc=5311&mode=04&purpose=00&utm_campaign=B2B_PG&utm_medium=MERCHANTUAT&utm_source=f304fea0a62644f5907f1072734741&mcbs=';
    if (Platform.OS === 'android') {
      NativeModules.ReactPhonePe.startReactPhonePe(URL, 'com.phonepe.app');
    } else {
    }
  }
  return (
    <View style={styles.rootContainer}>
      <TouchableOpacity
        style={styles.actionButton}
        activeOpacity={0.7}
        onPress={() => getUpiListToRN()}>
        <Text style={styles.actionButtonLabel}>Get UPI App List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, {marginTop: 12}]}
        activeOpacity={0.7}
        onPress={() => startPhonePe()}>
        <Text style={styles.actionButtonLabel}>Pay via PhonePe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  actionButton: {
    height: 45,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  actionButtonLabel: {
    color: 'white',
  },
});

export default App;
