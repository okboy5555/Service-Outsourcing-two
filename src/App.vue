<template>
      <router-view></router-view>
  
</template>

<script>

export default {
  data () {
    return {}
  },
  mounted () {
    this.loading();
  },
  methods: {
    loading () {
      const { START_TIME } = window; // => window.START_TIME
      const { END_TIME } = new Date().getTime();
      const LOAD_TIME = END_TIME - START_TIME;
      let timer = setTimeout(() => {
        clearTimeout(timer)
        document.querySelector('.app-loading').className += ' app-loading-hide';
      }, LOAD_TIME > 2000 ? 0 : 2000 - LOAD_TIME)
    }
  }
}

</script>

<style lang="stylus">
</style>
