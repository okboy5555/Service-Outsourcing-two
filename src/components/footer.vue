<template>
    <div class="footer">
        <p>
            <span>蓝鸥科技有限公司</span>
            <span>移动互联网科技育人专家</span>            
        </p>
        <p>
            <router-link to="user">关于蓝鸥</router-link>
            <span>｜</span>
            <router-link to="test">关注我们</router-link>
            <span>｜</span>
            <router-link to="test">学科体系</router-link>
            <span>｜</span>
            <router-link to="test">招贤纳士</router-link>
        </p>
        <p>京公安网备案 11010500896<img src="/static/img/police.png"/> 京ICP备12045384号-1</p>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="stylus" scoped>
    .footer
      position: fixed
      bottom: 1rem
      text-align: center
      font-size: 0.8rem
      color: #757575
      line-height: 1.5rem
      a
        color: #757575
      img
        width: 1rem
        height: 1rem
    
</style>