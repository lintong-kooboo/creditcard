<template>
  <div id="card">
    <div :class="[cardStyle]">
      <div class="card-front">
        <div class="card-image"></div>
        <div class="card-num" :class="[numStyle]">
          {{cardNum}}
        </div>
        <div class="card-owner" :class="[nameStyle]">
          {{cardOwner?cardOwner:'YOUR NAME HERE'}}
        </div>
        <div class="card-validThru" :class="[validthruStyle]">
          valid thru<br>
          {{cardValidThru?cardValidThru:'●●/●●'}}
        </div>
      </div>
      <div class="card-back">
        <div class="card-back-bg"></div>
        <div class="card-back-content">
          {{cvc}}
        </div>
      </div>
    </div>
    <div class="card-info">
      <div class="input-part1">
          <div class="input-part1-left">
            <input class="input-cardNum" @focus="changeNumstyle" @blur="defaultNumStyle" @input="editcardNum" ref="inputCardNum" type="text" placeholder="Card Number" maxlength="19">
            E.g.: 49..., 51..., 36..., 37...
          </div>
          <div class="input-part1-right">
            <input class="input-name" v-model="cardOwner" @focus="changeNamestyle" @blur="defaultNameStyle" @input="editName" ref="inputName" type="text" placeholder="Name">
          </div>
      </div>
      <div class="input-part2">
        <div class="input-part2-left">
          <input class="input-validThru" @focus="changeValidthrustyle" @blur="defaultValidthruStyle" @input="editValidThru" ref="inputValidThru" type="text" placeholder="Valid Thru" maxlength="4">
        </div>
        <div class="input-part2-right">
          <input class="input-cvc" @input="editCvc" ref="inputCvc" @focus="toCardBack" @blur="toCardFront" type="text" placeholder="CVC" maxlength="4">
        </div>
      </div>
    </div>
    <div class="pay">
      <button class="pay-btn" type="submit" v-on:click="pay">Pay</button>
      <div class="pay-card-info" :class="[cardInfo]">
          number: {{cardNum}}<br>
          name: {{cardOwner}}<br>
          expiry: {{cardValidThru}}<br>
          cvc: {{cvc}}<br>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name : 'creditcard',
    data() {
      return {
        cardStyle : 'card',
        cardNum : '●●●● ●●●● ●●●● ●●●●',
        cardOwner : '',
        cardValidThru : '●●/●●',
        cvc : '',
        numStyle : '',
        nameStyle : '',
        validthruStyle : '',
        cardInfo : ''
      }
    },
    methods : {
      editcardNum :  function(e){
        this.$refs.inputCardNum.value = e.target.value.replace(/[^\d]/g,'');
        var number = this.$refs.inputCardNum.value;
        var defaultnum = '';
        if(number.length <= 16) {
          for(var i = 0;i < 16 - number.length ; i++){
            defaultnum += '●'
          }
          number += defaultnum;
          this.cardNum = number.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
        } else {
          for(var i = 0;i < 19 - number.length ; i++){
            defaultnum += '●'
          }
          number += defaultnum;
          this.cardNum = number.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
        }
      },
      editName : function() {
        this.cardOwner = this.$refs.inputName.value;
      },
      editValidThru : function(e) {
        this.$refs.inputValidThru.value = e.target.value.replace(/[^\d]/g,'');
        var validThru= this.$refs.inputValidThru.value;
        var defaultnum = '';
        for (var i = 0; i < 4 - validThru.length; i++) {
          defaultnum += '●';
        }
        validThru += defaultnum;
        validThru = validThru.replace(/\s/g, '').replace(/(.{2})/g, "$1/");
        this.cardValidThru = validThru.substring(0,validThru.length-1);
      },
      editCvc :function(e) {
        this.$refs.inputCvc.value = e.target.value.replace(/[^\d]/g,'');
        this.cvc= this.$refs.inputCvc.value;
      },
      toCardBack : function() {  
        this.cardStyle = 'cardback';
      },
      toCardFront : function() {
        this.cardStyle = 'cardfront' + ' ' + 'card';
      },
      pay : function() {
        var num = this.$refs.inputCardNum.value;
        var name = this.$refs.inputName.value;
        var validThru = this.$refs.inputValidThru.value;
        var cvc = this.$refs.inputCvc.value;
        if(num.length == 16 || num.length == 19) {
          if(name) {
            if(validThru.length == 4) {
              if(cvc.length == 4) {
                this.cardInfo = "pay-info-show";
              } else {
                alert("Please enter the correct cvc format!")
              }
            } else {
              alert("Please enter the correct expiry format!")
            }
          } else {
            alert("Please enter your name!")
          }
        } else {
          alert("Please enter the correct card number format!")
        }
      },
      changeNumstyle : function() {
        this.numStyle = 'change'
      },
      changeNamestyle : function() {
        this.nameStyle = 'change'
      },
      changeValidthrustyle : function() {
        this.validthruStyle = 'change'
      },
      defaultNumStyle : function() {
        this.numStyle = ''
      },
      defaultNameStyle : function() {
        this.nameStyle = ''
      },
      defaultValidthruStyle : function() {
        this.validthruStyle = ''
      }
    }
  }
</script>

<style rel="stylesheet">
  html,body {
    margin: 0;
    padding: 0;
  }
  #card {
    margin: 30px auto;
    transform-style: preserve-3d;
  }
  .card-front,.card-back {
    backface-visibility: hidden;
  }
  .card-front {
    z-index: 2;
  }
  .card-back {
    transform: rotateY(180deg);
  }
  .card {
    width: 290px;
    margin: 0 auto;
    color: #C3C3C3;
    border-radius: 15px;
    background-color: #999999;
    position: relative;
  }
  .cardfront {
    transition: 0.6s;
    transform-style: preserve-3d;
  }
  .card .card-back {
    display: none;
  }
  .card .card-front {
    display: block;
  }
  .cardback {
    width: 290px;
    margin: 0 auto;
    color: #C3C3C3;
    border-radius: 15px;
    background-color: #999999;
    position: relative;
    transform: rotateY(180deg);
    transition: 0.6s;
    transform-style: preserve-3d;
  }
  .cardback .card-front {
    display: none;
  }
  .cardback .card-back {
    display: block;
  }
  .card-front {
    width: 230px;
    padding: 18px 0 30px 30px;
    font-size: 13PX;
    font-weight: bolder;
  }
  .card-back {
    width: 100%;
    height: 141px;
    padding: 18px 0 30px;
    background-color: #000000;
    margin: 0 auto;
    border-radius: 15px;
    background-color: #999999;
  }
  .card-image {
    width: 37px;
    height: 27px;
    background-image: url(../assets/img/card-image.svg);
    background-repeat: no-repeat;
    background-size: contain;
  }
  .card-num {
    margin: 40px auto 35px;
    font-size: 14px;
    letter-spacing: 2px;
  }
  .card-owner {
    width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
  }
  .card-validThru {
    width: 30%;
    font-size: 12px;
    text-align: center;
    float: right;
    margin-top: -18px;
  }
  .card-back-bg {
    width: 100%;
    height: 41px;
    background-color: #000000;
  }
  .card-back-content {
    width: 75%;
    height: 33px;
    font-size: 12px;
    font-weight: 550;
    color: #000000;
    text-align: right;
    line-height: 43px;
    margin: 10px 0 0 15px;
    background-image: url(../assets/img/back.png);
  }
  .card-info {
    width: 400px;
    margin: 30px auto;
    font-size: 12px;
  }
  .card-info input {
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    padding: 10px 0;
    margin-top: 20px;
    outline: #80BDFF;
    text-indent: 10px;
  }
  .input-part1 {
    width: 100%;
  }
  .input-cardNum,.input-name {
    width: 100%;
  }
  .card-info input:focus {
    border: 1px solid #808Dff;
    border-radius: 5px;
  }
  .input-part2 {
    width: 100%;
  }
  .input-part2 div {
    width: 40%;
    float: left;
  }
  .input-part2 input {
    margin-top: 20px;
    width: 100%;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
  }
  .input-part2-right {
    margin-left: 20%;
  }
  .pay {
    width: 400px;
    height: 38px;
    margin: 80px auto 0;
    position: relative;
    background-color: #007BFF;
    border: 1px solid #007BFF;
    border-radius: 5px;
  }
  .pay-btn {
    border: 0;
    width: 100%;
    height: 38px;
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    background-color: #007BFF;
    display: block;
    outline: none;
  }
  .pay-btn:hover {
    cursor: pointer;
  }
  .pay-card-info {
    display: none;
    padding: 20px 50px;
    line-height: 30px;
    font-size: 14px;
  }
  .pay-info-show {
    display: block;
  }
  .change {
    color: #ffffff;
  }
</style>
