<template>
    <div class="right-sidebar-container">
        <transition name="transition-bg-right-sidebar">

            <div @click.self="sidebarToggle"
                 v-if="show_sidebar"
                 class="bg-right-sidebar">
            </div>

        </transition>
        <transition name="transition-right-sidebar">
            <div class="right-sidebar"
                 v-if="show_sidebar"
            >
                <div class="right-sidebar-header">

                    <div>
                        Блог
                    </div>

                    <div @click="sidebarToggle" class="btn-close-right-sidebar">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <div class="right-sidebar-content">
                    <div class="right-sidebar-info">
                        <div v-if="auth">
                            <div class="user-avatar">
                                <img :src="user.avatar" />
                            </div>
                            <div class="user-name">
                                {{ user.name }}
                            </div>
                        </div>
                    </div>
                    <div class="right-sidebar-menu">
                        <router-link v-for="link in menu"
                                     :key="link.url"
                                     :to="link.url"
                                     :exact="link.exact"
                                     active-class="active"
                                     class="link-right-sidebar"
                        >
                            {{ link.title }}
                        </router-link>
                    </div>
                </div>
            </div>


        </transition>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import menu from '@/store/menu';

export default {
    name: "SidebarRight",
    data(){
        return {
            menu: menu
        }
    },
    computed: {
        ...mapGetters(['show_sidebar', 'auth', 'user']),
    },
    methods: {
        sidebarToggle() {
            this.$store.commit('sidebarToggle');
        },
    },
}
</script>

<style scoped>
.bg-right-sidebar{
    @apply w-screen h-screen bg-opacity-60 bg-black transition-all
}

.right-sidebar-container{
    @apply fixed top-0 left-0 overflow-hidden w-full h-auto
}

.right-sidebar{
    @apply absolute right-0 top-0 h-full bg-white w-10/12 shadow-lg transition-all flex flex-col
}

.right-sidebar-header{
    @apply h-14 flex justify-between items-center px-3 bg-blue-400 text-white
}

.btn-close-right-sidebar{
    @apply h-6 w-6 p-1 cursor-pointer
}

.right-sidebar-content{
    @apply flex flex-col flex-grow flex-shrink-0 basis-auto
}

.right-sidebar-info{
    @apply flex flex-col justify-center items-center flex-grow flex-shrink-0 basis-auto
}

.user-avatar{
    @apply text-center mb-6
}

.user-avatar img{
    @apply w-6/12 mx-auto rounded shadow-xl object-contain
}

.user-name{
    @apply text-center text-xl my-3
}

.right-sidebar-menu{
    @apply flex flex-col pb-6
}

.right-sidebar-menu>a{
    @apply px-4 py-6 text-2xl text-center
}

.transition-bg-right-sidebar-enter-active,
.transition-bg-right-sidebar-leave-active {
    transition: all .5s ease;
}

.transition-bg-right-sidebar-enter-from,
.transition-bg-right-sidebar-leave-to {
    opacity: 0;
}

.transition-right-sidebar-enter-active,
.transition-right-sidebar-leave-active {
    transition: all .5s ease;
}

.transition-right-sidebar-enter-from,
.transition-right-sidebar-leave-to {
    right: -100%;
}
</style>