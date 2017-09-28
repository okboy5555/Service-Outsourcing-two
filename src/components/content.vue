<template>
    <div class="content">
        <slot></slot>
    </div>
</template>

<script>
    
</script>

<style lang="stylus" scoped>
.content
  position: absolute
  top: 3rem
  bottom: 4rem
  right: 0
  left: 0 
  padding: 0
  overflow: auto
  z-index: 99
  -webkit-overflow-scrolling: touch
</style>