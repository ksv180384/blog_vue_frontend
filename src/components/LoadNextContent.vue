<template>
    <div class="next-load" :ref="id">
        Загрузка...
    </div>
</template>

<script>
export default {
    name: "LoadNextContent",
    props: {
        id: {
            type: String,
            required: true,
        }
    },
    mounted() {
        this.setUpInterSectionObserver();
    },
    methods: {
        setUpInterSectionObserver() {
            let options = {
                root: this.$refs.app,
                margin: "10px",
            };
            this.listEndObserver = new IntersectionObserver(
                this.handleIntersection,
                options
            );
            this.listEndObserver.observe(this.$refs[this.id]);
        },
        handleIntersection([entry]) {
            if (entry.isIntersecting) {
                this.$emit('onVisible');
            }
        },
    }
}
</script>

<style scoped>
.next-load{
    @apply shadow-lg bg-green-300 text-gray-50 text-center py-2 rounded-lg my-4
}
</style>