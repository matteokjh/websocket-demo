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
    height: 50px;
    user-select: none;
}
.you {
    height: 50px;
    position: relative;
}
.me {
    height: 50px;
    position: relative;
}
.avatar {
    display: inline-block;
    width: 50px;
    height: 50px;
    user-select: none;
}
.you .content {
    display: inline-block;
    padding: 8px 10px;
    border: 1px solid #eee;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 65px;
    transform: translateY(-50%);
}
.me .content {
    display: inline-block;
    padding: 8px 10px;
    border: 1px solid #eee;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    right: 65px;
    transform: translateY(-50%);
}
.me .avatar {
    float: right;
}
.content p {
    /* user-select: all; */
}
</style>