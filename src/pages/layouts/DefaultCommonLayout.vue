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

            <SidebarRight />
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
import SidebarRight from "@/components/SidebarRight";

export default {
    computed: {
        ...mapGetters(['show_registration', 'auth'])
    },
    components: {
        SidebarRight,
        ScrollUp,
        RightUserInfo,
        RegistrationRightCard,
        LoginRightCard,
        Header,
        Footer
    },
}
</script>
