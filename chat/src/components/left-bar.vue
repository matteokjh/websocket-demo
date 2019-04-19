<template>
    <div class="left-bar">
        <slot name='avatar'>头像</slot>
        <slot name='chatList'>聊天</slot>
        <slot name='friends'>联系人</slot>
        <slot name='collection'>收藏</slot>
        <slot name='setting' class='setting'>设置</slot>
        <slot name='s-wrapper' class='s-wrapper'>设置详情</slot>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="css" scope>

</style>
