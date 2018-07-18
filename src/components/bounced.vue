<template>
  <div class="promptMessage">
    <div class="arrow">
      <div class="blank"></div>
    </div>
    <div class="bounced">
        <img src="../assets/img/bounced.png">
        <span>{{promptMsg}}</span>
    </div>
  </div>
</template>

<script>
  export default { 
    props: {
      promptMsg: {
        type: String
      }
    }
  }  
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .promptMessage
    width 340px
    height 40px
    border 1px solid #B4B4B3
    margin 8px auto 20px
    position relative
    left 50%
    margin-left -170px
    background-color #ffffff
    .arrow
      border-color transparent transparent #B4B4B3 transparent 
      border-width 8px
      border-style dashed dashed solid dashed 
      position absolute
      left 50%
      top -50%
      margin-left -4px
      margin-top 4px
      .blank
        border-color transparent transparent #fff transparent 
        border-width 8px
        border-style dashed dashed solid dashed 
        position absolute
        left -8px
        top -7px
    .bounced
      height 30px
      padding 0 15px
      overflow hidden
      line-height 40px
      text-align center
      img
        width 20px
        height 20px
        margin 10px 0
        float left
</style>