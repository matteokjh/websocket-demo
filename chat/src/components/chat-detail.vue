<template>
    <div class='chat-detail'>
        <div class="piece" :key='idx' v-for='(e, idx) in chatDetail'>
            <div class="you" v-if='!e.isMe'>
                <div class="avatar"
                    :style="{
                        backgroundImage: 'url('+e.avatar+')'   
                    }"
                ></div>
                <div class="content">
                    <p>{{ e.content }}</p>
                </div>
            </div>
            <div class="me" v-else-if='e.isMe'>
                <div class="avatar"
                    :style="{
                        backgroundImage: 'url('+e.avatar+')'   
                    }"
                ></div>
                <div class="content">
                    <p>{{ e.content }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'chatDetail',
    ],
    methods: {

    }
}
</script>

<style lang="css" scope>
.title {
    margin-top: 20px;
    border-bottom: 1px solid #eee;
    padding: 0 0 20px 15px;
    user-select: none;
    height: 35px;
    line-height: 35px;
}
.title p{
    font-size: 25px;
    font-weight: bold;
    display: inline-block;
    cursor: pointer;
}
.piece {
    padding: 20px 30px;
    min-height: 50px;
    user-select: none;
    clear: both;
}
.you {
    min-height: 50px;
    width: 100%;
    position: relative;
    float: left;
}
.me {
    min-height: 50px;
    width: 100%;
    position: relative;
    float: right;
}
.avatar {
    display: inline-block;
    width: 50px;
    height: 50px;
    user-select: none;
}
.you .content {
    padding: 8px 10px;
    border: 1px solid #eee;
    border-radius: 5px;
    margin-top: 9px;
    float: left;
}
.you .avatar {
    float: left;
    margin-right: 10px;
}
.me .content {
    padding: 8px 10px;
    border: 1px solid #eee;
    border-radius: 5px;
    float: right;
    margin-top: 9px;
}
.me .avatar {
    float: right;
    margin-left: 10px;
}
.content {
    max-width: 35%;
}
.piece:last-child .content {
    margin-bottom: 15px;
}
.content p {
    /* user-select: all; */
}
</style>