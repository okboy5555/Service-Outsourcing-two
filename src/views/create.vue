<template>
    <div>
       <v-header title="发帖" class="create-header">
            <div slot="left" @click="$router.go(-1)">
                <i class="iconfont icon-back1"></i>
            </div>
            <div slot="right" @click="submit(title,tab,content)">
                <i class="iconfont icon-selected"></i>
            </div>
        </v-header>
       <v-content class="content">
        <form flex="dir:top">
            <div class="title">
                <input v-model="title" type="text" placeholder="标题...">
            </div>
            <div class="select">
                <select v-model="tab" >
                    <option value="">请选择版块</option>
                    <option :value="option.value"  v-for="option in tabs" >{{option.text}}</option>
                </select>
            </div>
            <div class="con" flex="dir:top" flex-box="1">
                <textarea flex-box="1" placeholder="内容..." v-model="content"></textarea>
            </div>
        </form>
        </v-content>
    </div>
</template>

<script>
import api from '../axios'
import util from '../utils/toast'
export default {
   data: function() {    
       return {
           title: '',
           tab: '',
           tabs: [
               { text: '精华', value: 'good' },
               { text: '分享', value: 'share' },
               { text: '问答', value: 'ask' },
               { text: '招聘', value: 'job' }
           ],
            content: ''
          
       }
   },
   methods: {
       submit (title,tab,content) {
           api.createArticle({title, tab, content}).then(({data}) => {
               console.log(data)
               if(data.errno) {
                    return util.toast(data.data);
               }
               return this.$router.push({ path: '/community/topic/'+ data.data });  
           }).catch((err) => {
               console.log(err);
           })
       },   
        swipe (evt) {
            if(evt.direction === 'Left') this.$router.go(-1);
        }
   }
}
</script>

<style lang="stylus" scoped>
.create
  height: 3rem
  line-height: 1rem
.create-header
  background: #fff !important
  color: #333 !important
.iconfont
  line-height: 3rem
.icon-back1
  font-size: 2rem
.icon-selected
  font-size: 2.5rem
  padding-right: .5rem

form 
  height: 100% 
.title 
  input
    padding: 1rem
.select 
  padding: 1rem
  border-top: .1rem solid #ddd 
  border-bottom: .1rem solid #ddd 
  select
    padding: 0
    background: #fff
    border-radius: 5px
    outline: none
.con 
  padding: .1rem .2rem 
textarea
  line-height: 1rem
input,
select,
textarea 
  font-size: 1rem
  box-sizing: border-box
  width: 100%
  height: auto
  padding: 1rem 
  border: none  
  resize: none 
  outline: none
.create-title
  font-size: 1.5rem
</style>