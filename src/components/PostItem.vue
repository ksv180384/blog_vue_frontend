<template>
    <div class="post-item">
        <PostRating :post_id="post_item.id"
                    :post_rating="post_item.rating"
                    :post_use_rating="post_item.use_rating"
        />

        <div class="post-item-container">
            <div class="post-info">
                <div class="post-info-top">
                    <div class="post-author">
                        <img :src="post_item.author.avatar" alt="Автор">
                        <router-link :to="`/user/${post_item.author.id}`" class="link">{{ post.author.name }}</router-link>
                    </div>
                    <div class="post-date">{{ post_item.created_at_humans }}</div>
                </div>

                <h2 class="post-header">
                    <router-link :to="{ path: '/post/' + post_item.id}" class="link">
                        {{ post_item.title }}
                    </router-link>
                </h2>
            </div>

            <div v-if="post_item.first_image">
                <img :src="post_item.first_image.path_storage">
            </div>

            <div class="post-item-content">
                {{ post_item.content }}
            </div>

            <div v-if="post_item.images">
                <img v-for="image in post_item.images" :key="image.id" :src="image.path_storage">
            </div>

        </div>

    </div>
</template>

<script>

import PostRating from "@/components/PostRating";

export default {
    components: { PostRating },
    props: ['post'],
    data() {
        return {
            post_item: this.post
        }
    },
}
</script>

<style scoped>
.post-item{
    @apply shadow-lg bg-white relative my-4 rounded ml-14 md:ml-0 last:m-0
}

.post-item-container{

}

.post-header{
    @apply mt-3 text-xl
}

.post-info{
    @apply p-4 font-semibold
}

.post-info-top{
    @apply flex justify-start items-center
}

.post-author{
    @apply flex justify-start items-center
}

.post-author img{
    @apply rounded-full w-10 h-10 object-cover mr-4
}

.post-author a{
    @apply mr-4
}

.post-date{
    @apply text-gray-600 text-xs font-normal
}

.post-item-content{
    @apply p-3 whitespace-pre-line;
}
</style>
