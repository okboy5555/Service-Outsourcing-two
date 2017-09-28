<template>
    <div class="loading-box">
      <div :class="!complete ? 'loading-start' : 'msg'">
        {{ complete ? '没有了' : '' }}
      </div>
  </div>
</template>

<script>
export default {
    props: {
      complete: { type: Boolean, default: false },
      loading: { type: Boolean, default: false }
    },
    data () {
      return {
        state: this.loading
      }
    },
    mounted () {
      this.timer = setInterval(() => {
        if (!this.state) {
          this.state = true
          this.$emit('seeing')
        }
      }, 300)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    watch: {
      loading (to) {
        this.state = to
      }
    }
}

</script>

<style lang="stylus" scoped>
.msg 
  line-height: 1rem
  text-align: center
  font-size: 1rem
.loading-start 
  margin: .5rem auto
  position: relative
  animation: rotate-forever 1s infinite linear
  height: 2rem
  width: 2rem
  border: .2rem solid #3897ff
  border-right-color: transparent
  border-radius: 50%
  .msg 
    display: none

@keyframes rotate-forever 
  0% 
    transform: rotate(0deg)
  100% 
    transform: rotate(360deg)
</style>