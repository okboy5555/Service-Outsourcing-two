import RouterStore from './store'

const store = new RouterStore();

const init = function ($route) {
    if(typeof this.$options.routeData !== 'function') {
        return new Error('必须是以方法返回对象');
    }

    this.$options.routeData._url = store.getUrl($route); 
    var keepalive = store.getItem(this.$options.routeData._url);
    if(keepalive) {
        return keepalive;
    }
    return this.$options.routeData.call(this);
};

const saveData = function () {
    var data = this.$options.routeData();
    var newData = {};
    Object.keys(data).forEach((i) => {newData[i] = this.$data[i]});
    store.setItem(this.$options.routeData._url, newData)
};

export default {
  data () {
    return init.call(this, this.$route)
  },
  destroyed () { // 组件卸载
    saveData.call(this) // 存储数据
  },
  watch: {
    $route (to, from) { // 当前组件路由发生改变
      saveData.call(this) // 存储数据
      Object.assign(this.$data, init.call(this, to)) // 重置路由数据
    }
  },
  mounted () {
    //   console.log(this.$options.routeData)
  }
}
