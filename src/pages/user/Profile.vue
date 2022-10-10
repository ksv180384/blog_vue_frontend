<template>
    <section class="pt-28 bg-blueGray-50">
        <div class="w-full px-4 mx-auto">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                <div class="px-6">
                    <div class="flex flex-wrap justify-center">
                        <div class="w-full px-4 flex justify-center">
                            <div class="">
                                <img :alt="name"
                                     :src="avatar" class="shadow-xl rounded w-44 h-44 align-middle border-none absolute -m-36 -ml-16 object-cover lg:-ml-16 max-w-150-px">
                            </div>
                        </div>
<!--                        <div class="w-full px-4 text-center mt-20">-->
<!--                            <div class="flex justify-center py-4 lg:pt-4 pt-8">-->
<!--                                <div class="mr-4 p-3 text-center">-->
<!--                                      <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">-->
<!--                                        22-->
<!--                                      </span>-->
<!--                                    <span class="text-sm text-blueGray-400">Friends</span>-->
<!--                                </div>-->
<!--                                <div class="mr-4 p-3 text-center">-->
<!--                                      <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">-->
<!--                                        10-->
<!--                                      </span>-->
<!--                                    <span class="text-sm text-blueGray-400">Photos</span>-->
<!--                                </div>-->
<!--                                <div class="lg:mr-4 p-3 text-center">-->
<!--                                      <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">-->
<!--                                        89-->
<!--                                      </span>-->
<!--                                    <span class="text-sm text-blueGray-400">Comments</span>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
                    </div>
                    <div class="text-center mt-12">
                        <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                            {{ name }}
                        </h3>
                    </div>
                    <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
                        <div class="flex flex-wrap justify-center">
                            <div class="w-full lg:w-9/12 px-4">
                                <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                                    {{ about }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import { profile } from '@/services/user_service';

export default {
    name: "Profile",
    data(){
        return {
            name: '',
            avatar: '',
            about: '',
        }
    },
    mounted() {
        //console.log(this.$route.params.id);
        this.loadPage();
    },
    methods: {
        async loadPage(){
            const resProfile = await profile(this.$route.params.id);
            const user = resProfile.user;
            this.name = user.name;
            this.avatar = user.avatar;
            this.about = user.about;
        }
    }
}
</script>

<style scoped>

</style>