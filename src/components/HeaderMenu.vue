<template>
    <nav>
        <router-link v-for="link in menu_top"
                     :key="link.url"
                     :to="link.url"
                     :exact="link.exact"
                     active-class="active"
                     class="link-top-menu"
        >{{ link.title }}</router-link>
    </nav>
    <button @click="sidebarToggle" type="button" class="btn-mobile-nav">
        <i class="fas fa-bars"></i>
    </button>
</template>

<script>
export default {
    data(){
        return {
            menu_top: this.$store.state.menu_top,
        }
    },
    methods: {
        sidebarToggle() {
            this.$store.commit('sidebarToggle');
        }
    },
}
</script>
