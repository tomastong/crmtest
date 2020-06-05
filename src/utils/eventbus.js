/**
 * @file vue实例中使用events选项
 * @author donghongyan
 * @date 2020-06-04
 */

import Vue from 'vue';

const bus = new Vue({});

function isString(value) {
  if (typeof value === 'string') {
    return true;
  }

  if (typeof value !== 'object') {
    return false;
  }

  return Object.prototype.toString.call(null, value) === '[object String]';
}

function isFunction(value) {
  const type = typeof value;
  return !!value && type === 'function';
}

const each = (collection, handler) => {
  return collection && Array.isArray(collection) ?
    collection.forEach(func => handler(func, func.name || func)) :
    Object.keys(collection).forEach(key => handler(collection[key], key));
};

function bindEvents(isOn) {
  const action = isOn ? '$on' : '$off';
  each(this.handlerEvents, (handler, key) => {
    bus[action](key, handler);
  });
}



export default {
  install() {
    Vue.mixin({
      created() {
        const me = this;
        if (!this.$options.events) {
          return;
        }

        this.handlerEvents = {};
        each(this.$options.events, (handler, key) => {
          let fn = null;
          if (isFunction(handler)) {
            fn = handler;
          }
          else if (isString(handler)) {
            fn = me.$options.methods[handler];
          }
          else {
            return;
          }
          me.handlerEvents[key] = (...args) => {
            fn && fn.apply(me, args);
          };
        });

        bindEvents.call(this, true);

      },
      beforeDestroy() {
        this.handlerEvents = this.handlerEvents || {};
        if (Object.keys(this.handlerEvents).length !== 0) {
          bindEvents.call(this, false);
        }

      }
    });
    Vue.prototype.$trigger = (...args) => {
      Vue.prototype.$emit.apply(bus, args);
    };
  }
}