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

<style rel="stylesheet">
  .promptMessage {
    width: 200px;
    height: 30px;
    border: 1px solid #B4B4B3;
    margin: 8px auto 20px;
    position: relative;
  }
  .promptMessage .arrow {
    border-color: transparent transparent #B4B4B3 transparent; 
    border-width: 8px;
    border-style:dashed dashed solid dashed; 
    position: absolute;
    left: 50%;
    top: -50%;
    margin-left: -4px;
    margin-top: -1px;
  }
  .promptMessage .arrow .blank {
    border-color: transparent transparent #fff transparent; 
    border-width: 8px;
    border-style:dashed dashed solid dashed; 
    position: absolute;
    left: -8px;
    top: -7px;
  }
  .promptMessage .bounced {
    height: 30px;
    padding: 0 15px;
    overflow: hidden;
    line-height: 30px;
    text-align: center;
  }
  .promptMessage .bounced img {
    width: 20px;
    height: 20px;
    margin: 5px 0;
    float: left;
  }
</style>