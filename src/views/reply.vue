<template>
    <div class="reply">
        <div class="reply-wrapper">
            <textarea :placeholder="nickname ? '@' + nickname : '发表你的看法...'" v-model="content"></textarea>
        </div>
        <div flex="main:right">
            <div class="msg"></div>
            <div flex-box="0"> <button @click="submit">{{ btnname }}</button> </div>
        </div>
    </div>
</template>

<script>
import api from '../axios'
import util from '../utils/toast'
export default {
    props: {
      replyId: { // 评论的评论id，如果没有则是对主题的评论
        type: String,
        default: ''
      },
      nickname: { // @ 
        type: String,
        default: ''
      }
    },
    data () {
      return {
        btnname: '回复',
        content: '',
      }
    },
    methods: {
        submit () {
            if(this.content == '') return util.toast('请输入评论内容')
            var { replyId, content, nickname } = this
            var topicId = this.$route.params.id
            if(replyId) {
                // content = `<a href=/user/${nickname}>@${nickname}</a>${content}`
                content = `[@${nickname}](/user/${nickname}) ${content}`
            }
            // console.log(id, content, nickname)
            api.reply({topicId, content, nickname}).then(({data}) => {
                if(data.errno) {
                    return util.toast(data.data)
                }
                console.log(data);
                this.$emit('success')
                // this.btnname = '回复'
                this.content = '';
            })

        }
    }
}

</script>

<style lang="stylus" scoped>

.reply-wrapper
  padding: .1rem .2rem 
  margin-bottom: .2rem
  border-radius: .1rem
  border: .1rem solid #eee 
  textarea 
    box-sizing: border-box 
    width: 100% 
    line-height: .5rem
    border: none 
    font-size: .5rem
    resize: none 
    outline: none
button
  padding: .1rem 1rem
  line-height: 1rem
  border-radius: .2rem
  border: 1px solid #3897ff
  font-size: 14px 
  color: #fff
  background: #3897ff
.msg 
  padding: .1rem .2rem
  line-height: 1rem
  color: red 
</style>