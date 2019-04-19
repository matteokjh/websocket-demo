<template>
    <div class="user-list">
        <div class='search'
            :style="{
                backgroundColor: focus ? '#fff' : '#eee'
            }"
        >
            <span class='s-icon'></span>
            <input type="text" v-on:focus='changeSearchColor()' v-on:blur='changeSearchColor()' placeholder="搜索" autocomplete="no" spellcheck="false"
                :style="{
                    backgroundColor: focus ? '#fff' : '#eee'
                }"
            >
        </div>

        <div class="list presure" v-if='index === 2'>
            <p>收藏</p>
            <p>还没做</p>
        </div>
        <div class="list" v-else-if='index === 0'>
            <user-piece :key='idx' v-for='(e, idx) in chatList'
                :avatar='e.avatar'
                :name='e.name'
                :time='e.time'
                :msg='e.msg'
                :active='idx == chosen ? true: false'
                @changeName='changeName(e,idx)'
            ></user-piece>
        </div>
        <div class="list2" v-else>
            <user-piece :key='idx' v-for='(e, idx) in userList'
                :avatar='e.avatar'
                :name='e.name'
                :time='e.time'
            ></user-piece>
        </div>
    </div>
</template>

<script>
import userPiece from './user-piece'
export default {
    props: [
        'index',
        'chatList',
        'userList'
    ],
    components: {
        'user-piece': userPiece
    },
    data(){
        return {
            focus: false,
            name: '',
            chosen: 0
        }
    },
    methods: {
        changeSearchColor(){
            this.focus = !this.focus;
        },
        changeName(e,idx){
            this.$emit('changeName',e);
            this.chosen = idx;
        }

    }
}
</script>

<style lang="css">
.search {
    display: flex;
    margin: 40px 15px 20px 15px;
    border-radius: 5px;
    border: 2px solid #eee;
    transition: all .3s;
    user-select: none;
    height: 30px;
}
.s-icon {
    background-image: url('../assets/search.png');
    display: inline-block;
    width: 30px;
    height: 30px;
    background-size: 60%;
    background-position: center;
    background-repeat: no-repeat;

}
.index input {
    outline: none;
    width: 80%;
    height: 30px;
    border: none;
    background-color: #eeeeee;
    transition: all .3s;
    line-height: 30px;
}
.list {
    background-color: #f8f8f8;
    overflow: auto;
    height: -webkit-fill-available;
    padding-bottom: 15px;
}
.presure {
    text-align: center;
}
.list2 {
    background-color: #f8f8f8;
    overflow: auto;
    height: -webkit-fill-available;
    padding-bottom: 15px;
}
.list2 .user-piece {
    line-height: 50px;
}
</style>

