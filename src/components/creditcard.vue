<template>
  <div id="card">
    <v-cardContent :cardNum="cardNum"
                   :cardOwner="cardOwner" 
                   :cardValidThru="cardValidThru" 
                   :showFront="showFront"
                   :cardCvc="cardCvc"
                   :numStyle="numStyle"
                   :nameStyle="nameStyle"
                   :validthruStyle="validthruStyle"></v-cardContent>
    <div class="card-info">
      <div class="input-part1">
          <div class="input-part1-left">
            <input class="input-cardNum" type="text" placeholder="Card Number" maxlength="19"
                   oninput="this.value = this.value.replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ')" 
                   v-model="cardNum"
                   ref="inputCardNum"
                   @click="showFront=true"
                   @focus="numStyle = !numStyle" 
                   @blur="numStyle = !numStyle">
            <v-bounced :promptMsg="promptMsg" v-show="isPrompt[0]"></v-bounced>
            E.g.: 49..., 51..., 36..., 37...
          </div>
          <div class="input-part1-right">
            <input class="input-name" type="text" placeholder="Name"
                   ref="inputName"
                   v-model="cardOwner" 
                   @click="showFront=true"
                   @focus="nameStyle = !nameStyle"
                   @blur="nameStyle = !nameStyle" >
            <v-bounced :promptMsg="promptMsg" v-show="isPrompt[1]"></v-bounced>
          </div>
      </div>
      <div class="input-part2">
        <div class="input-part2-left">
          <input class="input-validThru" type="text" placeholder="Valid Thru" maxlength="5"
                 oninput="this.value = this.value.replace(/[^\d]/g,'').replace(/(\d{2})(?=\d)/g,'$1/')" 
                 v-model="cardValidThru"
                 ref="inputValidThru"
                 @click="showFront=true"
                 @focus="validthruStyle = !validthruStyle" 
                 @blur="validthruStyle = !validthruStyle" >
          <v-bounced :promptMsg="promptMsg" v-show="isPrompt[2]"></v-bounced>
        </div>
        <div class="input-part2-right">
          <input class="input-cvc" type="text" placeholder="CVC" maxlength="4"
                 oninput="this.value = this.value.replace(/[^\d]/g,'')" 
                 v-model="cardCvc"
                 ref="inputCvc"  
                 @click="showFront=false">
          <v-bounced :promptMsg="promptMsg" v-show="isPrompt[3]"></v-bounced>
        </div>
      </div>
    </div>
    <div class="pay">
      <button class="pay-btn" type="submit" v-on:click="pay" @click="showFront=true">Pay</button>
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
import cardContent from "@/components/cardContent"

export default {
  name : 'creditcard',
  data() {
    return {
      showFront : true,
      cardNum : '',
      cardOwner : '',
      cardValidThru : '',
      cardCvc : '',
      numStyle : false,
      nameStyle : false,
      validthruStyle : false,
      promptMsg : '',
      isPrompt : [],
      showResult : false
    }
  },
  components : {
    'v-cardContent' : cardContent,
    'v-bounced': bounced
  },
  methods : {
    pay : function() {
      var cardinfo = [this.cardNum,this.cardOwner,this.cardValidThru,this.cardCvc]
      // card number
      if(cardinfo[0].length < 1) {
        this.isPrompt[0] = true
        this.promptMsg="Please enter the card number."
        return
      } else if(cardinfo[0].length != 19) {
        this.isPrompt[0] = true
        this.promptMsg="Please keep consistent with the required length."
        return
      } else {
        this.isPrompt[0] = false
      }
      // name
      if(cardinfo[1].length < 1 || cardinfo[1]==="YOUR NAME HERE") {
        this.isPrompt[1] = true
        this.promptMsg="Please enter your name."
        return
      } else {
        this.isPrompt[1] = false
      }
      // valid thru
      if(cardinfo[2].length < 1) {
        this.isPrompt[2] = true
        this.promptMsg="Please enter the valid thru."
        return
      } else if(cardinfo[2].length != 5) {
        this.isPrompt[2] = true
        this.promptMsg="Please keep consistent with the required length."
        return
      } else {
        this.isPrompt[2] = false
      }
      // cvc
      if(cardinfo[3].length < 1) {
        this.isPrompt[3] = true
        this.promptMsg="Please enter the cvc."
        return
      } else if(cardinfo[3].length != 4) {
        this.isPrompt[3] = true
        this.promptMsg="Please keep consistent with the required length."
        return
      } else {
        this.isPrompt[3] = false
      }
      if(!this.isPrompt[0] && !this.isPrompt[1] && !this.isPrompt[2] && !this.isPrompt[3]) {
        this.showResult = true
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
    .changeBlack
      color black
    .selected-enter-active, .selected-leave-active
        transition opacity .5s
    .selected-enter, .selected-leave-active
      opacity 0
</style>