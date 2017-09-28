<template>
  <div class="item-vector">
      <div class="item-question">
         <span>{{count + 1}}.</span>{{ question }}
      </div>
      <div class="item-options">
          <template v-for="(item,index) in option">
            <div class="item-option" @click="choose(index,kind)">
                <span :class="{ right: isright[index], choosed: ischoosed[index] }" v-if="kind == 'single' && item != ''" class="item-single">{{toLetter(index)}}</span>
                <span :class="{ right: isright[index], choosed: ischoosed[index], half: mix[index]}" v-if="kind == 'multiple' && item != ''" class="item-multiple">{{toLetter(index)}}</span>
                <span class="item-content">{{ item }}</span>
            </div>
          </template>
      </div>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import utils from '../utils/toast'
import api from '../axios'
export default {
    props:['question','option','kind','count','marked', 'inAnalysis'],
    data: function () {
        return {
            index: 0,
            ischoosed: [],
            isright: [],
            mix: [],
            answer: [],
            answer_status: false,
        }
    },
    mounted () {
        // this.next(this.choices_qid, this.sub_qid, this.tid, this.uid);
    },
    methods: {
        ...mapActions(['set_test_status','set_statuslist']),
        initABCD (history, result) {
             this.ischoosed = [];
             this.isright = [];
             this.mix = [];
            if(history) {
                history.forEach((i) => {
                    this.ischoosed[parseInt(i, 16) - 10] = true;
                })
            }

            if(result) {
                result.forEach((i) => {
                    this.isright[parseInt(i, 16) - 10] = true;
                })
            }
            if(history && result) {
                history.forEach((item, index) => {
                    if(item == result[index]) {
                        this.mix[parseInt(item, 16) - 10] = true;
                    }
                })
                console.log('mix',this.mix)
            }
        },
        toLetter (index) {
            return String.fromCharCode(index + 65);
        },
        choose (index, kind) {
            if(this.inAnalysis) {
                return;
            }
      
            if(kind == 'single') {
                for(let i = 0;i<this.ischoosed.length;i++){
                    this.$set(this.ischoosed, i, false);
                }
                this.$set(this.ischoosed, index, true);
                // make answer arr empty,it's nessary otherwise prev answer will add to now answer
                this.answer.splice(0,this.answer.length);
                this.answer.push(this.toLetter(index));
                this.$emit('fromItem',[this.answer,this.kind]);
                // this.next(this.choices_qid, this.sub_qid, this.tid, this.uid)
            }
            
            if(kind == 'multiple') {
                this.ischoosed[index] == true ? this.$set(this.ischoosed, index, false) : this.$set(this.ischoosed, index, true);
                this.answer.splice(0,this.answer.length);
                this.ischoosed.forEach((item, index) => {
                    if(item) {
                        this.answer.push(this.toLetter(index))
                    }
                })
                this.$emit('fromItem',[this.answer,this.kind]);
            }
            
            this.answer.length == 0 ? this.answer_status = false : this.answer_status = true;
            // this.set_test_status([this.count, this.answer_status]);
            this.set_statuslist([this.count, 'finished', this.answer_status]);
            
        },
        mark () {
            let arr = JSON.parse(localStorage.getItem('evaluate_now_list')) || []
            if(arr[this.count]['marked']) {
                this.set_statuslist([this.count, 'marked', false]);
                return utils.toast('已取消标记');
            }
            this.set_statuslist([this.count, 'marked', true]);
            return utils.toast('该题已标记')
        },
    },
}
</script>

<style lang="stylus" scoped>
.item-vector
  margin-bottom: 4rem
.item-option
  width: 90%
  padding: 0.6rem 1rem
  span:first-child
    display: inline-block
    height: 1.5rem
    width: 1rem
    line-height: 1.5rem
    padding-left: 0.4rem
    padding-right: 0.1rem
.item-question
  width: 90%
  margin: 1rem auto
  margin-left: 1rem
  line-height: 1.2rem
  white-space: pre-wrap
  span
    margin-right: .5rem
.item-single
  border: .1rem solid #3897ff
  border-radius: 50%
.item-multiple
  border: .1rem solid #3897ff
  border-radius: 10%
.item-content
  line-height: 2rem
.right
  background: red
  color: #fff
  border: .1rem solid red
.choosed
  background: #3897ff
  color: #fff
  border: .1rem solid #3897ff
.half
  background: linear-gradient(to right, #3897ff .5rem, red 1rem)
  color: #fff
  border: .1rem solid red
</style>