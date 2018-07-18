<template>
  <div :class="[cardStyle]" v-bind:style="{background : changeBgColor}">
      <div class="card-front">
        <div class="card-image"></div>
        <div class="card-logo" :class="[changeCardLogo]"></div>
        <div class="card-num" :class="{focused : numStyle}">
          {{editCardNum}}
        </div>
        <div class="card-owner" :class="{focused : nameStyle}">
          {{editCardOwner}}
        </div>
        <div class="card-validThru" :class="{focused : validthruStyle}">
          valid thru<br>
          {{editCardValidThru}}
        </div>
      </div>
    <div class="card-back">
      <div class="card-back-bg"></div>
      <div class="card-back-content">
        {{cardCvc}}
      </div>
    </div>
  </div>
</template>

<script>

import { replaceStr } from "../common/common.js"

export default {
  name : 'cardContent',
  props : {
    cardStyle : {
      type : String,
      value : 'card'
    },
    cardNum : {
      type : String,
      value : ''
    },
    cardOwner : {
      type : String,
      value : ''
    },
    cardValidThru : {
      type : String,
      value : ''
    },
    cardCvc : {
      type : [Number,String],
      value : ''
    },
    numStyle : {
      type : Boolean,
      value : false
    },
    nameStyle : {
      type : Boolean,
      value : false
    },
    validthruStyle : {
      type : Boolean,
      value : false
    }
  },
  data(){
    return {
      cardLogo : ''
    }
  },
  computed : {
    editCardNum : function() {
      return !this.cardNum ? '●●●● ●●●● ●●●● ●●●●' : replaceStr('●●●● ●●●● ●●●● ●●●●',this.cardNum)
    },
    editCardOwner : function() {
      return !this.cardOwner ? 'YOUR NAME HERE' : this.cardOwner
    },
    editCardValidThru : function() {
      return !this.cardValidThru ? '●●/●●' : replaceStr('●●/●●',this.cardValidThru)
    },
    changeBgColor : function() {
      var value = this.cardNum.substring(0,2)
      switch (value) {
        case '49':
          return 'linear-gradient(25deg, #0f509e, #1399cd)'
        case '51':
          return 'linear-gradient(25deg, #f37b26, #fdb731)'
        case '36':
          return 'linear-gradient(25deg, #fff, #eee)'
        case '37':
          return 'linear-gradient(25deg, #308c67, #a3f2cf)'
        default:
          return ''
          break
      }
    },
    changeCardLogo : function() {
      var value = this.cardNum.substring(0,2)
      switch (value) {
        case '49':
          return 'bgone'
        case '51':
          return 'bgtwo'
        case '36':
          return 'bgthree'
        case '37':
          return 'bgfour'
        default:
          return ''
          break
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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
  .focused 
    color #ffffff
  .bgone
    background-image url(../assets/img/49.jpg)
  .bgtwo
    background-image url(../assets/img/51.svg)
  .bgthree
    background-image url(../assets/img/36.svg)
  .bgfour
    background-image url(../assets/img/37.svg)
</style>