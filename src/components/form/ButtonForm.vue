<template>
    <div class="btn-form">
        <button class="btn" :class="[`btn-${style}`, { 'w-full': w_full }]"
                :type="type"
                :disabled='disabled || load'
        >
            <span :class="{ 'btn-opacity': load }">
                <slot></slot>
            </span>

            <span v-if="load" class="btn-spinner">
                <i class="fa fa-spinner fa-pulse fa-fw"></i>
            </span>
        </button>
    </div>
</template>

<script>
export default {
    name: "ButtonForm",
    props: {
        style: {
            type: String,
            default: 'primary'
        },
        type: {
            type: String,
            default: 'button'
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        load: {
            type: Boolean,
            default: false
        },
        w_full: {
            type: Boolean,
            default: false
        }
    },
}
</script>
<style scoped>
.btn-form{
    @apply relative inline-block;

}

.btn-spinner{
    @apply absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.btn-opacity{
    @apply opacity-0;
}
</style>