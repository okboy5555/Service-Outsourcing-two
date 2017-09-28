<template>
    <div class="vheader" flex="box:justify">
        <slot name="left">
            <div class="item" flex="main:center cross:center"></div>
        </slot>
        <p class="title">{{ title }}</p>
        <slot name="right">
            <div class="item" flex="main:center cross:center"></div>
        </slot>
    </div>
</template>

<script>
export default {
    props:{
        title: { type: String , default: ''}
    }
}
</script>

<style lang="stylus" scoped>
.vheader
  position: fixed
  top: 0
  left: 0
  right: 0
  z-index: 999
  height: 3rem
  line-height: 3rem
  background: #3897ff
  color: #fff
.title
  overflow: hidden
  text-align: center
  font-size: 1rem
  white-space: nowrap
  text-overflow: ellipsis
</style>