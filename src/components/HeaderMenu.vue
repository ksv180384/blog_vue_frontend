<template>
    <nav>
        <router-link v-for="link in menu"
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
import { mapMutations } from "vuex";
import menu from '@/store/menu';

export default {
    data(){
        return {
            menu: menu,
        }
    },
    methods: {
        ...mapMutations(['sidebarToggle']),
    },
}
</script>
