<template>
    <div class="app" ref="app">
        <ErrorRequest/>
        <PreloaderPage v-if="is_loading_page"/>
        <component :is="layout">
            <router-view :layout="layout"/>
        </component>
    </div>
</template>

<script>

import { mapGetters } from "vuex";
import DefaultCommonLayout from '@/pages/layouts/DefaultCommonLayout';
import AuthCommonLayout from '@/pages/layouts/AuthCommonLayout';
import ErrorLayout from '@/pages/layouts/ErrorLayout';
import PreloaderPage from '@/components/PreloaderPage';
import ErrorRequest from "@/components/ErrorRequest";

export default {
    computed: {
        ...mapGetters(['is_loading_page']),
        layout(){
            return (this.$route.meta.layout || 'DefaultCommonLayout')
        }
    },
    components: {
        ErrorRequest,
        DefaultCommonLayout,
        AuthCommonLayout,
        ErrorLayout,
        PreloaderPage
    }
}
</script>
