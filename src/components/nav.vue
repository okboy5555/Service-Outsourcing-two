<template>
    <div class="nav">
        <template v-for="(item, index) in items">
            <router-link :to="item.link">
                <div class="nav-item">
                    <div class="nav-icon">
                        <i v-if="$route.path.indexOf(item.link) !== -1" :class="[common,item.active]"></i>
                        <i v-else :class="[common,item.unactive]"></i>
                    </div>
                    <p>{{ item.text }}</p>
                </div>
            </router-link>
        </template>
    </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
    export default {
        computed: mapState({ flag: (state) => state.icon_flags }),
        data: function () {
            return {
                common: 'iconfont',
                items: [
                    {
                        text: '学习',
                        unactive: 'icon-form',
                        active: 'icon-formfill',
                        link: '/learn',
                    },
                    {
                        text: '社区',
                        unactive: 'icon-shop',
                        active: 'icon-shopfill',
                        link: '/community',
                    },
                    {
                        text: '消息',
                        unactive: 'icon-message',
                        active: 'icon-messagefill',
                        link: '/message',
                    },
                    {
                        text: '个人中心',
                        unactive: 'icon-people',
                        active: 'icon-peoplefill',
                        link: '/user',
                    }
                ]
            }
        },
        methods: {
            
        },
        mounted () {
            
        }
    }
</script>

<style scope lang="stylus">
.nav
  display: flex
  position: fixed;
  bottom: 0;
  border-top: 1px solid #c0c0c0
  background: #F0F0F0
  width: 100%
  height: 4rem
  line-height: 1.2rem
  font-size: 0.9rem
  z-index:999
  a
    flex: 1
    .nav-item
        text-align: center
        .nav-icon
          padding-top: 0.8rem
        .iconfont
          font-size: 1.8rem     
</style>