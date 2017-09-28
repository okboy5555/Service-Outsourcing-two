<template>
    <div>
        <v-header title="修改用户名">
            <div slot="left" @click="$router.go(-1)">
                <i class="iconfont icon-back1"></i>
            </div>
        </v-header>
        <v-content v-finger:swipe="swipe">
            <div>
                <input name="nickname" type="text" flex="main:center" v-model="nickname"/>
                <p>用户名限制5~24字符之间</p>
            </div>
            <button @click="submit">保存设置</button>
            
        </v-content>
    </div>
</template>

<script>
import utils from '../utils/toast'
import { mapState } from 'vuex'
export default {
    computed: mapState(
        {
            user: (state) => state.user
        }
    ),
    data () {
        return {
            nickname: '',
        }
    },
    methods: {
        submit () {
            if(!(nickname.length >= 5 && nickname.length <= 24)) return utils.toast('请输入合法的用户名');
            api.saveUserName({ nickname }).then(({data}) => {
                    if(data.errno == 0) {
                        this.user.nickname = nickname;
                    }
                    return utils.toast(data.data)
                })
        },
           
        swipe (evt) {
            if(evt.direction === 'Right') this.$router.go(-1);
        }
    }
}
</script>

<style lang="stylus" scoped>
input
  margin: 0 auto
  width: 90%
  padding: .4rem
  border: .05rem solid #ddd 
  border-radius: .05rem
  line-height: 1.2rem 
  font-size: .7rem    
p
  padding: .5rem
  font-size: .8rem;
  color: #666
button
  display: block
  margin: 0 auto
  width: 90%
  height: 2.8rem
  border: .1rem solid #158cfb
  border-radius: .05rem
  font-size: 1rem
  color: #fff
  background: #158cfb
.icon-back1
  font-size: 1.5rem
</style>