import faceAlertComponent from '../components/faceAlert';
import objectAssign from 'object-assign';

const mergeOptions = function($vm, options) {
  const defaults = {};
  for (let i in $vm.$options.props) {
    if (i !== 'value') {
      defaults[i] = $vm.$options.props[i].default;
    }
  }
  const _options = objectAssign({}, defaults, options);
  for (let i in _options) {
    $vm[i] = _options[i];
  }
};

let $vm;

const plugin = {
  install(vue, options = {}) {
    const FaceAlert = vue.extend(faceAlertComponent);

    if (!$vm) {
      $vm = new FaceAlert({
        el: document.createElement('div'),
        propsData: {
          title: ''
        }
      });
      document.body.appendChild($vm.$el);
    }

    const faceAlert = {
      show(options) {
        if (typeof options === 'object') {
          mergeOptions($vm, options);
        }
        if (typeof options === 'object' && (options.onShow || options.onHide)) {
          options.onShow && options.onShow();
        }
        this.$watcher && this.$watcher();
        this.$watcher = $vm.$watch('showValue', val => {
          if (!val && options && options.onHide) {
            options.onHide();
          }
        });

        $vm.$off('on-cancel');
        $vm.$off('on-confirm');

        $vm.$on('on-cancel', () => {
          options && options.onCancel && options.onCancel();
        });
        $vm.$on('on-confirm', msg => {
          options && options.onConfirm && options.onConfirm(msg);
        });
        $vm.showValue = true;
      },
      setInputValue(val) {
        vue.nextTick(() => {
          setTimeout(() => {
            $vm.setInputValue(val);
          }, 10);
        });
      },
      prompt(placeholder, options) {
        this.show(
          Object.assign({}, options, {
            placeholder,
            showInput: true
          })
        );
      },
      hide() {
        $vm.showValue = false;
      },
      isVisible() {
        return $vm.showValue;
      }
    };

    vue.faceAlert = faceAlert;

    // // all Vux's plugins are included in this.$vux
    // if (!vue.$vux) {
    //   vue.$vux = {
    //     faceAlert
    //   };
    // } else {
    //   vue.$vux.faceAlert = faceAlert;
    // }

    vue.mixin({
      created: function() {
        // this.$vux = vue.$vux;
        this.faceAlert = vue.faceAlert;
      }
    });
  }
};

export default plugin;
export const install = plugin.install;
