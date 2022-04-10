<template>
    <header class="header">
        <div class="header-navigation">
            <div class="flex justify-between items-center">
                <div class="flex space-x-7">
                    <router-link to="/" class="flex items-center py-4 px-2">
                        <span class="text-blue-600">Блог</span>
                    </router-link>
                </div>

                <HeaderMenu/>
            </div>
        </div>
    </header>
</template>
<script>
import HeaderMenu from "@/components/HeaderMenu";
export default {
    components: {HeaderMenu}
}
</script>