<template>
    <div class="topbar">
      <div class="topbar-item">
        <div class="topbar-logo">
          <router-link to="/">
            <img src="../../static/img/logo.png">
          </router-link>
        </div>
      </div>
      <div class="topbar-item">
        <div class="topbar-title"></div>
      </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="stylus" scoped>
.topbar
  display:flex
  justify-content: space-between
  position: fixed
  width: 100%
  height: 3rem
  background: #3897ff
  z-index: 999
  .topbar-logo 
    padding-top: 0.9rem
    padding-left: 0.4rem
    img
      width: 6.38rem
      height: 1rem
</style>