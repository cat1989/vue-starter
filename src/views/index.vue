<template>
    <div class="view">
        <h1>
            <img src="/public/images/logo.png" alt="" />{{ greeting }}
        </h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            greeting: 'ue-starter'
        }
    }
}
</script>

<style lang="scss" scoped>
    .view {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #303133;
        background-color: #F5F7FA;
        font-size: px2rem(14);
        h1 {
            font-size: px2rem(32);
            font-weight: 600;
        }
        img {
            height: px2rem(32);
            vertical-align: middle;
        }
    }
</style>