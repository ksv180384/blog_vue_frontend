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
                        <a href="#" class="link">{{ post.author.name }}</a>
                    </div>
                    <div class="post-date">{{ post_item.created_at_humans }}</div>
                </div>

                <h2 class="post-header">
                    <router-link :to="{ path: '/post/' + post_item.id}">{{ post_item.title }}</router-link>
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
