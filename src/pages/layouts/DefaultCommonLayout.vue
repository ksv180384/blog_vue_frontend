<template>
    <Header/>
    <main>
        <div class="content">
            <div class="content-center">
                <router-view/>
            </div>
            <div class="content-right">
                <template v-if="!auth">
                    <LoginRightCard v-if="!showRegistration"/>
                    <RegistrationRightCard v-else/>
                </template>
                <template v-else>
                    <RightUserInfo/>
                </template>
            </div>

            <div class="right-sidebar-container">
                <transition name="transition-bg-right-sidebar">

                    <div @click.self="sidebarToggle"
                         v-if="showSidebar"
                         class="bg-right-sidebar">
                    </div>

                </transition>
                <transition name="transition-right-sidebar">
                    <div class="right-sidebar"
                         v-if="showSidebar"
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

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginRightCard from "@/components/LoginRightCard";
import RegistrationRightCard from "@/components/RegistrationRightCard";
import RightUserInfo from "@/components/RightUserInfo";

export default {
    data() {
        return {
            menu_top: this.$store.getters.menu_top,
        }
    },
    components: {RightUserInfo, RegistrationRightCard, LoginRightCard, Header, Footer},
    methods: {
        sidebarToggle() {
            this.$store.commit('sidebarToggle');
        },
    },
    computed: {
        showSidebar() {
            return this.$store.getters.show_sidebar;
        },
        showRegistration() {
            return this.$store.getters.show_registration;
        },
        auth(){
            return this.$store.getters.auth;
        },
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