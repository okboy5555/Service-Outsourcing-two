<template>
    <div class="wrapper" flex="main:center cross:center">
    <div class="tip">
        <div class="tip-icon" flex="main:center cross:center">
            <i class="iconfont icon-warn"></i>
        </div>
        <p>{{ tipText }}</p>
        <div class="tip-action" flex="box:mean">
            <div @click="confirm">确认</div>
            <div @click="cancel">取消</div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    props: ['tipText'],
    data () {
        return {

        }
    },
    methods: {
        confirm () {
            this.$emit('confirm');
        },
        cancel () {
            this.$emit('cancel');
        }
    },
}
</script>

<style lang="stylus" scoped>
.wrapper
  width: 100%
  height: 100%
  position: absolute
.tip
  position: fixed
  width: 16rem
  height: auto
  background: #f5f5f5
  z-index: 999
  color: #333
  border-radius: .5rem
.icon-warn
  margin-top: 1rem
  font-size: 3rem
  color: #f8cb86
.tip-action
  margin-top: 1rem
  background: #3897ff
  text-align: center
  line-height: 2rem
  color: #fff
  font-size: .8rem
  border-radius: 4%
  border-top: .05rem solid #eaeaea
  div:first-child
    height: 2rem
    border-right: .01rem solid #fff
p
  text-align: center
  color: #333
  margin: .2rem 0
  font-size: .8rem
  line-height: 1rem
</style>