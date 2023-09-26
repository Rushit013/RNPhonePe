import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  NativeModules,
  NativeEventEmitter,
  Image,
} from 'react-native';
import {intersection, map, find} from 'lodash';
import {UPIAppIds, getUPIData} from './config/config';

const ReactPhonePe =
  Platform.OS === 'ios'
    ? null
    : new NativeEventEmitter(NativeModules.ReactPhonePe);

const App = () => {
  const [availUPIs, setAvailUPIs] = useState([]);

  useEffect(() => {
    getUpiListToRN();
  }, []);

  async function getUpiListToRN() {
    if (Platform.OS === 'android') {
      const upis = await NativeModules.ReactPhonePe.getUpiListToRN();

      const parseUpis = String(upis.replace(/[\[\]']+/g, '')).split(',');
      const validateMobileUpis = map(parseUpis, function (obj) {
        return String(obj).trim();
      });

      const UPIIds = intersection(validateMobileUpis, UPIAppIds);

      const validateUPIIds = map(UPIIds, function (packageName) {
        return {...getUPIData(packageName), isSelected: false};
      });
      setAvailUPIs(validateUPIIds);
    } else {
    }
  }

  function startPhonePe() {
    const selectedPaymentApp = find(availUPIs, 'isSelected');
    const {packageName} = selectedPaymentApp;
    const URL =
      'upi://pay?pa=MERCHANTUAT@ybl&pn=MERCHANT&am=1&mam=1&tr=f304fea0a62644f5907f1072734741&tn=Payment%20for%20f304fea0a62644f5907f1072734741&mc=5311&mode=04&purpose=00&utm_campaign=B2B_PG&utm_medium=MERCHANTUAT&utm_source=f304fea0a62644f5907f1072734741&mcbs=';

    if (Platform.OS === 'android') {
      NativeModules.ReactPhonePe.startReactPhonePe(URL, packageName);
    } else {
    }
  }

  const onSelectUPIApp = index => {
    const updateAvailUPIs = availUPIs.map((item, listIndex) => {
      return {
        ...item,
        isSelected: index === listIndex ? true : false,
      };
    });

    setAvailUPIs(updateAvailUPIs);
  };

  const renderItem = () => {
    return availUPIs.map((item, index) => {
      const {isSelected} = item;
      return (
        <TouchableOpacity
          style={{
            // height: 60,
            width: '100%',
            marginVertical: 4,
            borderWidth: 1,
            padding: 8,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: isSelected ? '#13292A' : 'black',
            backgroundColor: isSelected ? '#E7DED9' : 'white',
          }}
          key={index.toString()}
          activeOpacity={0.7}
          onPress={() => {
            onSelectUPIApp(index);
          }}>
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: isSelected ? '#13292A' : 'black',
              borderWidth: isSelected ? 1.5 : 1,
              borderColor: 'black',
            }}>
            <Image
              source={item?.icon}
              style={{
                height: 30,
                width: 30,
              }}
              resizeMode="contain"
            />
          </View>
          <Text
            style={{
              marginLeft: 12,
              textAlign: 'center',
              color: 'black',
            }}>
            {item?.name}
          </Text>
        </TouchableOpacity>
      );
    });
  };
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        padding: 12,
        backgroundColor: 'white',
      }}>
      <View style={{marginTop: 12}}>
        <Text
          style={{
            fontWeight: '600',
            fontSize: 18,
            color: 'black',
          }}>
          UPI Payment
        </Text>

        <Text
          style={{
            fontWeight: '500',
            fontSize: 14,
            marginTop: 4,
            color: 'black',
            opacity: 0.7,
          }}>
          Select the payment app you've already installed to proceed with your
          transaction.
        </Text>
      </View>

      <View
        style={{
          borderStyle: 'dotted',
          borderWidth: 1,
          borderRadius: 1,
          marginVertical: 8,
        }}></View>

      <View
        style={{
          flex: 1,
          marginTop: 12,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {renderItem()}
      </View>
      <TouchableOpacity
        style={{
          height: 45,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
          marginVertical: 12,
        }}
        activeOpacity={0.7}
        onPress={() => startPhonePe()}>
        <Text style={{color: 'white'}}>Pay ₹ 1</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
