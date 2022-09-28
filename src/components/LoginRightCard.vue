<template>
    <div class="content-right-card">
        <div class="right-card-header">Авторизация</div>
        <div class="w-5/6 mx-auto">
            <form action="#" @submit.prevent="submitLogin">

                <InputGroup v-model.trim="email"
                            placeholder="Введите email"
                            :disabled="isDisabled"
                            :class="{ error: error_response }"
                            :error_message="error_response"
                >
                    Email
                </InputGroup>
                <InputGroup v-model.trim="password"
                            type="password"
                            placeholder="Введите пароль"
                            :disabled="isDisabled"
                            :class="{ error: error_response }"
                            :error_message="error_response"
                >
                    Пароль
                </InputGroup>


                <Checkbox v-model="remember">Запомнить</Checkbox>

                <div class="text-center mt-6">
                    <button class="btn btn-primary"
                            type="submit"
                            :disabled='isDisabled'
                    >
                        Войти
                    </button>
                </div>
            </form>

            <div class="text-center my-3">
                <a href="#"
                   @click.prevent="registrationToggle"
                   class="link font-semibold uppercase"
                >
                    Регистрация
                </a>
            </div>
            <hr>
            <SocialLogin/>
        </div>
    </div>
</template>

<script>

import useVuelidate from '@vuelidate/core';

import { mapMutations } from "vuex";

import SocialLogin from "@/components/SocialLogin";
import Checkbox from "@/components/form/Checkbox";
import InputGroup from "@/components/form/InputGroup";

import { userLogin } from "@/servises/user_servise";

export default {
    setup(){
        return { v$: useVuelidate() }
    },
    data(){
        return {
            email: '',
            password: '',
            remember: false,
            isDisabled: false,
            error_response: null,
        }
    },
    methods: {
        ...mapMutations(['setAuth', 'setUser', 'registrationToggle']),
        async submitLogin(){
            this.error_response = null;
            if(this.v$.$invalid){
                this.v$.$touch();
                return true;
            }
            this.isDisabled = true;
            const dataForm = { email: this.email, password: this.password };

            // try {
            //     const resUserLogin = await userLogin(dataForm);
            //     const user = resUserLogin.user;
            //     this.isDisabled = false;
            //
            //     localStorage.setItem('user', JSON.stringify(user));
            //     this.setAuth(true);
            //     this.setUser(user);
            // } catch (e) {
            //     console.log(error.response);
            //     this.error_response = error?.response?.data?.message;
            //     this.isDisabled = false;
            // }

        }
    },
    components: { SocialLogin, InputGroup, Checkbox },
}
</script>