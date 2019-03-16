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

        <div class="list" v-if='index === 2'>
            收藏
        </div>
        <div class="list" v-else>
            <user-piece :key='idx' v-for='(e, idx) in chatList'
                :avatar='e.avatar'
                :name='e.name'
                :time='e.time'
                :msg='e.msg'
                @changeName='changeName'
            ></user-piece>
        </div>
    </div>
</template>

<script>
import userPiece from './user-piece'
export default {
    props: [
        'index',
        'chatList'
    ],
    components: {
        'user-piece': userPiece
    },
    data(){
        return {
            focus: false,
            name: ''
        }
    },
    methods: {
        changeSearchColor(){
            this.focus = !this.focus;
        },
        changeName(e){
            this.$emit('changeName',e);
        }

    }
}
</script>

<style lang="css" scope>
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
input {
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
</style>

