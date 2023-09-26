const icon_amazon = require('../assets/amazon-pay-icon.png');
const icon_gpay = require('../assets/google-pay-icon.png');
const icon_phonepe = require('../assets/phonepe-logo-icon.png');
const icon_paytm = require('../assets/paytm-icon.png');
const icon_upi = require('../assets/upi-payment-icon.png');

export const UPIAppIds = [
  'in.amazon.mShop.android.shopping',
  'com.google.android.apps.nbu.paisa.user',
  'com.phonepe.app',
  'net.one97.paytm',
  'in.org.npci.upiapp',
];

export const getUPIData = packageName => {
  switch (packageName) {
    case 'in.amazon.mShop.android.shopping':
      return {
        name: 'Amazon',
        icon: icon_amazon,
        packageName: packageName,
      };

    case 'com.google.android.apps.nbu.paisa.user':
      return {
        name: 'GPay',
        icon: icon_gpay,
        packageName: packageName,
      };

    case 'com.phonepe.app':
      return {
        name: 'PhonePe',
        icon: icon_phonepe,
        packageName: packageName,
      };

    case 'net.one97.paytm':
      return {
        name: 'PayTM',
        icon: icon_paytm,
        packageName: packageName,
      };

    case 'in.org.npci.upiapp':
      return {
        name: 'BHIM',
        icon: icon_upi,
        packageName: packageName,
      };

    default:
      break;
  }
};
