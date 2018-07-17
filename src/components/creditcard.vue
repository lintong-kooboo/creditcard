<template>
  <div id="card">
    <div :class="[cardStyle]" v-bind:style="{background : bgColor}">
        <div class="card-front">
          <div class="card-image"></div>
          <div class="card-logo" :class="[cardLogo]"></div>
          <div class="card-num" :class="{focused : numStyle}">
            {{cardNum}}
          </div>
          <div class="card-owner" :class="{focused : nameStyle}">
            {{cardOwner?cardOwner:'YOUR NAME HERE'}}
          </div>
          <div class="card-validThru" :class="{focused : validthruStyle}">
            valid thru<br>
            {{cardValidThru?cardValidThru:'●●/●●'}}
          </div>
        </div>
      <div class="card-back">
        <div class="card-back-bg"></div>
        <div class="card-back-content">
          {{cardCvc}}
        </div>
      </div>
    </div>
    <div class="card-info">
      <div class="input-part1">
          <div class="input-part1-left">
            <input class="input-cardNum" type="text" placeholder="Card Number" maxlength="19"
                  @input="editcardNum" 
                  v-model="cardnumber"
                  v-mask="'#### #### #### ####'"
                  ref="inputCardNum"
                  @focus="numStyle = !numStyle" 
                  @blur="numStyle = !numStyle">
            <v-bounced :promptMsg="promptMsg" v-show="numPromopt"></v-bounced>
            E.g.: 49..., 51..., 36..., 37...
          </div>
          <div class="input-part1-right">
            <input class="input-name" type="text" placeholder="Name"
                  ref="inputName"
                  v-model="cardOwner" 
                  @focus="nameStyle = !nameStyle"
                  @blur="nameStyle = !nameStyle" >
            <v-bounced :promptMsg="promptMsg" v-show="namePromopt"></v-bounced>
          </div>
      </div>
      <div class="input-part2">
        <div class="input-part2-left">
          <input class="input-validThru" type="text" placeholder="Valid Thru" maxlength="5"
                @input="editValidThru" 
                v-model="cardvalidthru"
                v-mask="'##/##'"
                ref="inputValidThru"
                @focus="validthruStyle = !validthruStyle" 
                @blur="validthruStyle = !validthruStyle" >
          <v-bounced :promptMsg="promptMsg" v-show="validthruPromopt"></v-bounced>
        </div>
        <div class="input-part2-right">
          <input class="input-cvc" type="text" placeholder="CVC" maxlength="4"
                v-mask="'####'"
                v-model="cardCvc"
                ref="inputCvc"  
                @focus="toCardBack" 
                @blur="toCardFront">
          <v-bounced :promptMsg="promptMsg" v-show="cvcPromopt"></v-bounced>
        </div>
      </div>
    </div>
    <div class="pay">
      <button class="pay-btn" type="submit" v-on:click="pay">Pay</button>
      <div class="pay-card-info" v-show="showResult">
          number: {{cardNum}}<br>
          name: {{cardOwner}}<br>
          expiry: {{cardValidThru}}<br>
          cvc: {{cardCvc}}<br>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">

import bounced from "@/components/bounced"
import { replaceStr } from "../common/common.js"

export default {
  name : 'creditcard',
  data() {
    return {
      cardStyle : 'card',
      cardNum : '●●●● ●●●● ●●●● ●●●●',
      cardnumber : '',
      cardOwner : '',
      cardValidThru : '●●/●●',
      cardvalidthru : '',
      cardCvc : '',
      numStyle : false,
      nameStyle : false,
      validthruStyle : false,
      promptMsg : '',
      numPromopt : false,
      namePromopt : false,
      validthruPromopt : false,
      cvcPromopt : false,
      bgColor : '',
      cardLogo : '',
      showResult : false
    }
  },
  components : {
    'v-bounced': bounced
  },
  methods : {
    editcardNum :  function(e){
      this.cardNum = replaceStr('●●●● ●●●● ●●●● ●●●●',e.target.value)
    },
    editValidThru : function(e) {
      this.cardValidThru = replaceStr('●●/●●',e.target.value)
    },
    toCardBack : function() {  
      this.cardStyle = 'cardback'
    },
    toCardFront : function() {
      this.cardStyle = 'cardfront' + ' ' + 'card'
    },
    pay : function() {
      var cardinfo = [this.cardnumber,this.cardOwner,this.cardvalidthru,this.cardCvc]
      if(cardinfo[0].length == 19) {
        this.numPromopt = false
        if(cardinfo[1] && cardinfo[1] != "YOUR NAME HERE") {
          this.namePromopt = false
          if(cardinfo[2].length == 5) {
            this.validthruPromopt = false
            if(cardinfo[3].length == 4) {
              this.cvcPromopt = false
              this.showResult = true
              // this.promptMsg = ''
              return 
            } else {
              this.cvcPromopt = true
              this.promptMsg="请按照要求填写此字段"
              return 
            }
          } else {
            this.validthruPromopt = true
            this.promptMsg="请按照要求填写此字段"
            return 
          }
        } else {
          this.namePromopt = true
          this.promptMsg="请按照要求填写此字段"
          return 
        }
      } else {
        this.numPromopt = true
        this.promptMsg="请按照要求填写此字段"
        return 
      }
    }
  },
  watch : {
    cardNum : function(val) {
      var value = val.substring(0,2)
      switch (value) {
        case '49':
          this.bgColor = 'linear-gradient(25deg, #0f509e, #1399cd)'
          this.cardLogo = 'bgone'
          break
        case '51':
          this.bgColor = 'linear-gradient(25deg, #f37b26, #fdb731)'
          this.cardLogo = 'bgtwo'
          break
        case '36':
          this.bgColor = 'linear-gradient(25deg, #fff, #eee)'
          this.cardLogo = 'bgthree'
          break
        case '37':
          this.bgColor = 'linear-gradient(25deg, #308c67, #a3f2cf)'
          this.cardLogo = 'bgfour'
          break
        default:
          this.bgColor = ''
          this.cardLogo = ''
          break
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  html,body 
    margin 0
    padding 0
    #card
      margin 30px auto
      transform-style preserve-3d
    .card-front,.card-back
      backface-visibility hidden
    .card-front
      z-index 2
    .card-back
      transform rotateY(180deg)
    .card
      width 290px
      margin 0 auto
      color #C3C3C3
      border-radius 15px
      background-color #999999
      position relative
      .card-back
        display none
      .card-front
        display block
    .cardfront
      transition 0.6s
      transform-style preserve-3d
    .cardback
      width 290px
      margin 0 auto
      color #C3C3C3
      border-radius 15px
      background-color #999999
      position relative
      transform rotateY(180deg)
      transition 0.6s
      transform-style preserve-3d
      .card-front
        display none
      .card-back
        display block
    .card-front
      width 230px
      padding 18px 0 30px 30px
      font-size 13PX
      font-weight bolder
    .card-back
      width 100%
      height 141px
      padding 18px 0 30px
      background-color #000000
      margin 0 auto
      border-radius 15px
      background-color #999999
    .card-image
      width 37px
      height 27px
      background-image url(../assets/img/card-image.svg)
      background-repeat no-repeat
      background-size contain
    .card-logo
      width 40%
      height 23%
      position absolute
      right 10%
      top 10%
      background-size contain
      background-repeat no-repeat
      background-position top right 
    .card-num
      margin 40px auto 35px
      font-size 14px
      letter-spacing 2px
    .card-owner
      width 60%
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      display inline-block
    .card-validThru
      width 30%
      font-size 12px
      text-align center
      float right
      margin-top -18px
    .card-back-bg
      width 100%
      height 41px
      background-color #000000
    .card-back-content
      width 75%
      height 33px
      font-size 12px
      font-weight 550
      color #000000
      text-align right
      line-height 43px
      margin 10px 0 0 15px
      background-image url(../assets/img/back.png)
    .card-info 
      width 400px
      margin 30px auto
      font-size 12px
      input
        border 1px solid #D9D9D9
        border-radius 5px
        padding 10px 0
        margin-top 20px
        outline #80BDFF
        text-indent 10px
      inputfocus
        border 1px solid #808Dff
        border-radius 5px
    .input-part1
      width 100%
    .input-cardNum,.input-name 
      width 100%
    .input-part2 
      width 100%
      .input-part2-left,.input-part2-right
        width 40%
        float left
      input
        margin-top 20px
        width 100%
        border 1px solid #D9D9D9
        border-radius 5px
    .input-part2-right
      margin-left 20%
    .pay
      margin 80px auto 0
      width 400px
      height 38px
    .pay-btn
      border 0
      margin-top 100px
      width 400px
      height 38px
      font-size 18px
      font-weight bold
      color #ffffff
      background-color #007BFF
      border 1px solid #007BFF
      border-radius 5px
      display block
      outline none
    .pay-btnhover
      cursor pointer
    .pay-card-info
      padding 20px 50px
      line-height 30px
      font-size 14px
    .focused 
      color #ffffff
    .changeBlack
      color black
    .selected-enter-active, .selected-leave-active
        transition opacity .5s
    .selected-enter, .selected-leave-active
      opacity 0
    .bgone
      background-image url(../assets/img/49.jpg)
    .bgtwo
      background-image url(../assets/img/51.svg)
    .bgthree
      background-image url(../assets/img/36.svg)
    .bgfour
      background-image url(../assets/img/37.svg)
</style>