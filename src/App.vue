<template>
    <div class="app">
        <component :is="layout">
            <router-view :layout="layout"/>
        </component>
    </div>
</template>

<script>

import DefaultCommonLayout from '@/pages/layouts/DefaultCommonLayout';
import AuthCommonLayout from '@/pages/layouts/AuthCommonLayout';
import ErrorLayout from '@/pages/layouts/ErrorLayout';

export default {
    computed: {
        layout(){
            return (this.$route.meta.layout || 'DefaultCommonLayout')
        }
    },
    methods: {

    },
    components: {
        DefaultCommonLayout, AuthCommonLayout, ErrorLayout
    }
}

</script>
