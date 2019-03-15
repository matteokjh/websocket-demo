<template>
    <div class='send-box'>
        <div class="bar"></div>
        <textarea name="msg" rows="5"  maxlength="200" onchange="this.value=this.value.substring(0, 200)" onkeydown="this.value=this.value.substring(0, 200)" onkeyup="this.value=this.value.substring(0, 200)" spellcheck="false"></textarea>
        <p class="send">发送</p>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="css" scope>
.bar {
    height: 15%;
    border-bottom: 1px solid #eee;
}
textarea {
    width: 100%;
    height: 60%;
    outline: none;
    border: none;
    background-color: #fff;
    font-size: 16px;
    line-height: 1.5em;
    letter-spacing: 1px;
    resize: none;
    padding: 5px 45px;
    box-sizing: border-box;
}
.send {
    padding: 10px 20px;
    border: 1px solid #eee;
    cursor: pointer;
    display: inline;
    border-radius: 3px;
    user-select: none;
    position: absolute;
    right: 20px;
    bottom: 20px;
    background-color: #eee;
}
</style>