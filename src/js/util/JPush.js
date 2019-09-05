import JPushModule from 'jpush-react-native';
import {Platform} from 'react-native';

if (Platform.OS === 'android') {
    JPushModule.notifyJSDidLoad(resultCode => {
        if (resultCode === 0) {
        }
    });
} else {
    JPushModule.setupPush();
}

console.log('JPush add Listener');

const receiveNotificationListener = event => {
    console.log('接收推送通知', event);
    if (Platform.OS === 'android') {
        if (event.alertContent) {
            // Synthesizer.start(event.alertContent);
        }
    } else {
        if (event.aps) {
            let aps = event.aps;
            console.log('aps=========', aps);
            if (aps.alert) {
                console.log('aps.alert=========', aps.alert);
                // Synthesizer.start(aps.alert);
            }
        }
    }
};


const openNotificationListener = event => {
    console.log('打开通知', event);
    if (event.extras) {
        if (Platform.OS === 'android') {
            let obj = JSON.parse(event.extras);
            // if (obj.type === Constants.NOTICE_TYPE_WORKORDER) {
            //     if (obj.orderId) {
            //         NavigationService.navigate('WorkOrderDetail', {
            //             id: obj.orderId
            //         });
            //     }
            // }
        } else {

            JPushModule.getBadge(badge => {
                JPushModule.setBadge(badge - 1, success => {

                    console.log('event.type   event.orderId', event.extras.type, event.extras.orderId);
                    // if (event.extras.type === Constants.NOTICE_TYPE_WORKORDER) {
                    //     if (event.extras.orderId) {
                    //         NavigationService.navigate('WorkOrderDetail', {
                    //             id: event.extras.orderId
                    //         });
                    //     }
                    // }


                });
            });


        }
    }
};

JPushModule.addReceiveNotificationListener(receiveNotificationListener);

JPushModule.addReceiveOpenNotificationListener(openNotificationListener);
