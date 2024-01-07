<template>
    <div class="container">
        <div class="main-container">
            <div class="main-area">
                <div class="card pt-3">
                    <router-view></router-view>
                    <router-view name="appheader"></router-view>
                    <router-view></router-view>
                </div>
            </div>

            <div class="footer">© Crawlson 2024</div>
        </div>
        <Menu class="sidebar" :model="items" />
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
                        life: 6000,
                    });
                }
            }
        );
    },
    beforeMount() {
    },
    data() {
        return {
            layout: ref("grid"),
            houses: [],
            dashboard_loading: true,
            showAllHouses: false,
            sortOptions: ref([
                { label: "Price High to Low", value: "!price" },
                { label: "Price Low to High", value: "price" },
            ]),
            items: ref([
                {
                    label: "Home",
                    items: [
                        {
                            label: "Dashboard",
                            icon: "pi pi-home",
                            command: () => {  this.$router.push({ name: "main" }); }
                        },
                        {
                            label: "My house",
                            icon: "pi pi-bookmark",
                        },
                        {
                            label: "Settings",
                            icon: "pi pi-cog",
                        },
                    ],
                },
                {
                    label: "Profile",
                    items: [
                        {
                            label: "Account",
                            icon: "pi pi-user",
                        },
                        {
                            label: "Logout",
                            icon: "pi pi-sign-out",
                            command: this.logout
                        },
                    ],
                },
            ]),
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
        logout() {
            this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
            this.$store.commit(`auth/${SET_JWT_TOKEN}`, "");
            this.$store.commit(`auth/${SET_USER_INFO}`, {});
            this.$router.push({ name: "login" });
        },
    },
};
</script>

<style>
.p-menu {
    border: 0px solid;
    border-radius: 0px;
}
.topbard {
    position: fixed;
    height: 5rem;
    z-index: 997;
    left: 0;
    top: 0;
    width: 100%;
    padding: 0 2rem;
    background-color: var(--surface-card);
    transition: left 0.2s;
    display: flex;
    align-items: center;
    box-shadow: 0 3px 5px #00000005, 0 0 2px #0000000d, 0 1px 4px #00000014;
}

html {
    font-size: 14px;
}

.logo {
    height: 40px;
    padding-left: 30px;
}
.p-link {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    color: var(--text-color-secondary);
    border-radius: 50%;
    width: 3.5rem;
    height: 3rem;
    cursor: pointer;
    transition: background-color 0.2s;
    text-align: left;
    background-color: transparent;
    margin: 0;
    padding: 0;
    border: none;
    cursor: pointer;
    user-select: none;
}
.button-holder {
    margin: 0 0 0 auto;
    padding: 0;
    list-style: none;
    display: flex;
}
.pi-l {
    font-size: 1.5rem;
}
body {
    font-family: var(--font-family);
    color: var(--text-color);
    background-color: var(--surface-ground);
    margin: 0;
    padding: 0;
    min-height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.p-submenu-header {
    text-align: start;
}
.p-menuitem-link {
    padding: 0.75rem 0.1rem;
    padding-left: 30px;
}
.main-container {
    margin-left: 232px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
    padding: 6.5rem 2rem 2rem 4rem;
    transition: margin-left 0.2s;
}
.footer {
    transition: margin-left 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
    border-top: 1px solid var(--surface-border);
    font-weight: 500 !important;
}
.card {
    background: var(--surface-card);
    border: 1px solid var(--surface-border);
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: var(--card-shadow);
    border-radius: 12px;
}
.sidebar {
    border: 1px solid var(--surface-border);
    border-radius: 12px;
    position: fixed;
    width: 230px;
    height: calc(100vh - 9rem);
    z-index: 999;
    overflow-y: auto;
    -webkit-user-select: none;
    user-select: none;
    top: 6.5rem;
    left: 2rem;
    transition: transform 0.2s, left 0.2s;
    background-color: var(--surface-overlay);
    padding: 0.5rem 1rem;
    box-shadow: 0 3px 5px #00000005, 0 0 2px #0000000d, 0 1px 4px #00000014;
}
.layout-menu .layout-root-menuitem > .layout-menuitem-root-text {
    font-size: 0.857rem;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--surface-900);
    margin: 0.75rem 0;
}
</style>
