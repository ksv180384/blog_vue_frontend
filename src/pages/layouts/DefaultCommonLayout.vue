<template>
    <Header/>
    <main>
        <div class="content">
            <div class="content-center">
                <router-view/>
                <ScrollUp/>
            </div>
            <div class="content-right">
                <template v-if="!auth">
                    <LoginRightCard v-if="!show_registration"/>
                    <RegistrationRightCard v-else/>
                </template>
                <template v-else>
                    <RightUserInfo/>
                </template>
            </div>

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
                        <div class="right-sidebar-menu">
                            <router-link v-for="link in menu_top"
                                         :key="link.url"
                                         :to="link.url"
                                         :exact="link.exact"
                                         active-class="active"
                                         class="link-right-sidebar"
                            >{{ link.title }}</router-link>
                        </div>
                    </div>


                </transition>
            </div>
        </div>
    </main>
    <Footer/>
</template>

<script>

import {mapGetters} from "vuex";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginRightCard from "@/components/LoginRightCard";
import RegistrationRightCard from "@/components/RegistrationRightCard";
import RightUserInfo from "@/components/RightUserInfo";
import ScrollUp from "@/components/ScrollUp";

export default {
    computed: {
        ...mapGetters(['show_sidebar', 'show_registration', 'auth', 'menu_top'])
    },
    methods: {
        sidebarToggle() {
            this.$store.commit('sidebarToggle');
        },
    },
    components: {
        ScrollUp,
        RightUserInfo,
        RegistrationRightCard,
        LoginRightCard,
        Header,
        Footer
    },
}
</script>

<style scoped>
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