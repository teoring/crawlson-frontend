<template>
    <div class="container">
        <div class="main-container">
            <div class="grid p-fluid">
                <div class="col-12 md:col-6">
                    <div class="card">
                        <h5>Telegram settings</h5>
                        <div class="grid formgrid">
                            <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                <label for="telegramNotifications">Notifications</label>
                                <SelectButton v-model="user.telegram_notifications" optionLabel="label" optionValue="value" :options="telegramNotifications" aria-labelledby="basic" inputId="telegramNotifications"/>

                            </div>
                            <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                <label for="TelegramUserName">Username</label>
                                <InputGroup>
                                    <InputText placeholder="" disabled type="text" v-model="user.username" inputId="TelegramUserName"/>
                                </InputGroup>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 md:col-6">
                    <div class="card">
                        <h5>Email settings</h5>
                        <div class="grid formgrid">
                            <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                <label for="emailNotifications">Notifications</label>
                                <SelectButton v-model="user.email_notifications" disabled optionLabel="label" optionValue="value" :options="telegramNotifications" aria-labelledby="basic" inputId="emailNotifications"/>

                            </div>
                            <div class="col-12 mb-2 lg:col-8 lg:mb-0">
                                <label for="Email">Email</label>
                                <InputGroup>
                                    <InputText placeholder="" disabled type="text" v-model="user.email" inputId="Email"/>
                                </InputGroup>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 md:col-6">
                    <div class="card">
                        <h5>Subscription</h5>
                        <div class="grid formgrid">
                            <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                <label for="EndDateSubscription">Valid till</label>
                                <InputGroup>
                                    <InputText placeholder="" disabled type="text" v-model="user.expires_at" inputId="Email"></InputText>
                                </InputGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Toast position="bottom-right" group="br" />
    </div>
</template>

<script>
import { GET_USER_INFO, GET_JWT_TOKEN, SET_AUTHENTICATION, SET_JWT_TOKEN, SET_USER_INFO } from "../store/storeconstants";
import { ref } from "vue";
import Config from "../config";
import axios from "axios";
import { useDateFormat, useNow } from "@vueuse/core";
import { useToast } from "primevue/usetoast";
import { watch } from "vue";
import { useStore } from "vuex";
import cityNames from "@/resources/city_names.json"

export default {
    name: "SettingsView",
    setup() {
        const store = useStore();
        const toast = useToast();

        watch(
            () => store.getters.getErrorMessage,
            (message, prevMessage) => {
                if (message) {
                    toast.add({
                        severity: "error",
                        summary: "Error",
                        detail: message,
                        group: "br",
                        life: 6000,
                    });
                }
            }
        );

        watch(
            () => store.getters.getInfoMessage,
            (message, prevMessage) => {
                console.log("info message", message);
                if (message) {
                    toast.add({
                        severity: "info",
                        summary: "Update",
                        detail: message,
                        group: "br",
                        life: 2000,
                    });
                }
            }
        );
    },
    beforeMount() {
    },
    data() {
        return {
            telegramNotifications: [
                { label: 'Off', value: false },
                { label: 'On', value: true },
            ],
            user: this.$store.state.auth.user,
        };
    },
    methods: {
        showToast( severity, message ){
            let topic = "";

            if( severity == "error") { topic = "setErrorMessage" }
            if( severity == "info") { topic = "setInfoMessage" }

            this.$store.commit( topic, message );

            setTimeout(() => {
                this.$store.commit( topic, "");
            }, 100);
        },
    },
};
</script>

<style>

</style>
