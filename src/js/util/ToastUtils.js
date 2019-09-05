import {Toast} from '@ant-design/react-native';

export default class ToastUtils {
    static show(content, duration, mask) {
        return Toast.show(content, duration, mask);
    }

    static success(content, duration, onClose, mask) {
        return Toast.success(content, duration, onClose, mask);
    }

    static fail(content, duration, onClose, mask) {
        return Toast.fail(content, duration, onClose, mask);
    }

    static offline(content, duration, onClose, mask) {
        return Toast.offline(content, duration, onClose, mask);
    }

    static loading(content, duration, onClose, mask) {
        return Toast.loading(content, duration, onClose, mask);
    }
}