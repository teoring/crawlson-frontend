<template>
    <div class="container">
            <div class="main-container">
                <div class="grid p-fluid">
                        <div class="col-12 md:col-6">
                            <div class="card">
                                <h5 class="m-0 pb-3">Price</h5>
                                <div class="grid formgrid">
                                    <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                        <label for="minHousePrice">Minimum house price</label>

                                        <InputNumber aria-describedby="minHousePrice-help" mode="currency" :min="0" currency="EUR" :maxFractionDigits="0" showButtons :step="25000" v-model="user.min_house_price" inputId="minHousePrice" />
                                        <small id="minHousePrice-help">Enter your username to reset your password.</small>

                                    </div>
                                    <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                        <label for="maxHousePrice" class="font-bold block mb-2"> Max. house price </label>
                                        <InputNumber v-model="user.max_house_price" showButtons :maxFractionDigits="0" :min="0" :step="25000" mode="currency" currency="EUR" inputId="maxHousePrice" ></InputNumber>
                                    </div>
                                </div>

                                <div class="grid formgrid pt-5">
                                    <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                        <label for="minLivingArea" class="font-bold block mb-2"> Min. living area </label>
                                        <InputNumber  :min="0" :useGrouping="false" v-model="user.min_living_area" inputId="minLivingArea" />
                                    </div>
                                    <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                        <label for="minConstructionYear" class="font-bold block mb-2"> Min. construction year</label>
                                        <InputNumber  :min="0" :useGrouping="false" v-model="user.min_construction_year" inputId="minConstructionYear" />
                                    </div>
                                    <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                        <label class="font-bold block mb-2" for="minEnergyLabel">Min. energy label</label>
                                        <Dropdown v-model="user.min_energy_label" inputId="minEnergyLabel" :options="eneryLabels" optionLabel="name" class="w-full md:w-14rem" />
                                    </div>
                                </div>

                                <h5 class="mt-3">Icons</h5>
                                <div class="grid formgrid">
                                    <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-user" />
                                            <InputText type="text" placeholder="Username" />
                                        </span>
                                    </div>
                                    <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                        <span class="p-input-icon-right">
                                            <InputText type="text" placeholder="Search" />
                                            <i class="pi pi-search" />
                                        </span>
                                    </div>
                                    <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                        <span class="p-input-icon-left p-input-icon-right">
                                            <i class="pi pi-user" />
                                            <InputText type="text" placeholder="Search" />
                                            <i class="pi pi-search" />
                                        </span>
                                    </div>
                                </div>

                                <h5>Float Label</h5>
                                <span class="p-float-label">
                                    <InputText id="username" type="text" v-model="floatValue" />
                                    <label for="username">Username</label>
                                </span>

                                <h5>Textarea</h5>
                                <Textarea placeholder="Your Message" :autoResize="true" rows="3" cols="30" />

                                <h5>AutoComplete</h5>
                                <AutoComplete placeholder="Search" id="dd" :dropdown="true" :multiple="true" v-model="selectedAutoValue" :suggestions="autoFilteredValue" @complete="searchCountry($event)" field="name" />

                                <h5>Calendar</h5>
                                <Calendar :showIcon="true" :showButtonBar="true" v-model="calendarValue"></Calendar>

                                <h5>Spinner</h5>
                                <InputNumber v-model="inputNumberValue" showButtons mode="decimal"></InputNumber>

                                <h5>Chips</h5>
                                <Chips v-model="chipsValue" />
                            </div>
                        </div>

                        <div class="col-12 md:col-6">
                            <div class="card">
                                <h5>RadioButton</h5>
                                <div class="grid">
                                    <div class="col-12 md:col-4">
                                        <div class="field-radiobutton mb-0">
                                            <RadioButton id="option1" name="option" value="Chicago" v-model="radioValue" />
                                            <label for="option1">Chicago</label>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="field-radiobutton mb-0">
                                            <RadioButton id="option2" name="option" value="Los Angeles" v-model="radioValue" />
                                            <label for="option2">Los Angeles</label>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="field-radiobutton mb-0">
                                            <RadioButton id="option3" name="option" value="New York" v-model="radioValue" />
                                            <label for="option3">New York</label>
                                        </div>
                                    </div>
                                </div>

                                <h5>Checkbox</h5>
                                <div class="grid">
                                    <div class="col-12 md:col-4">
                                        <div class="field-checkbox mb-0">
                                            <Checkbox id="checkOption1" name="option" value="Chicago" v-model="checkboxValue" />
                                            <label for="checkOption1">Chicago</label>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="field-checkbox mb-0">
                                            <Checkbox id="checkOption2" name="option" value="Los Angeles" v-model="checkboxValue" />
                                            <label for="checkOption2">Los Angeles</label>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="field-checkbox mb-0">
                                            <Checkbox id="checkOption3" name="option" value="New York" v-model="checkboxValue" />
                                            <label for="checkOption3">New York</label>
                                        </div>
                                    </div>
                                </div>

                                <h5>Input Switch</h5>
                                <InputSwitch v-model="switchValue" />
                            </div>

                            <div class="card">
                                <h5>Listbox</h5>
                                <Listbox v-model="listboxValue" :options="listboxValues" optionLabel="name" :filter="true" />

                                <h5>Dropdown</h5>
                                <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />

                                <h5>MultiSelect</h5>
                                <MultiSelect v-model="multiselectValue" :options="multiselectValues" optionLabel="name" placeholder="Select Countries" :filter="true">
                                    <template #value="slotProps">
                                        <div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2" v-for="option of slotProps.value" :key="option.code">
                                            <span :class="'mr-2 flag flag-' + option.code.toLowerCase()" style="width: 18px; height: 12px" />
                                            <div>{{ option.name }}</div>
                                        </div>
                                        <template v-if="!slotProps.value || slotProps.value.length === 0">
                                            <div class="p-1">Select Countries</div>
                                        </template>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="flex align-items-center">
                                            <span :class="'mr-2 flag flag-' + slotProps.option.code.toLowerCase()" style="width: 18px; height: 12px" />
                                            <div>{{ slotProps.option.name }}</div>
                                        </div>
                                    </template>
                                </MultiSelect>

                                <h5>TreeSelect</h5>
                                <TreeSelect v-model="selectedNode" :options="treeSelectNodes" placeholder="Select Item"></TreeSelect>
                            </div>

                            <div class="card">
                                <h5>ToggleButton</h5>
                                <ToggleButton v-model="toggleValue" onLabel="Yes" offLabel="No" :style="{ width: '10em' }" />

                                <h5>SelectButton</h5>
                                <SelectButton v-model="selectButtonValue1" :options="selectButtonValues1" optionLabel="name" />

                                <h5>SelectButton - Multiple</h5>
                                <SelectButton v-model="selectButtonValue2" :options="selectButtonValues2" optionLabel="name" :multiple="true" />
                            </div>
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
            user: this.$store.state.auth.user,
            eneryLabels: [
                { name: "A+++", code: "a-ppp" },
                { name: "A++", code: "a-pp" },
                { name: "A+", code: "a-p" },
                { name: "A", code: "a" },
                { name: "B", code: "b" },
                { name: "C", code: "c" },
                { name: "D", code: "d" },
                { name: "E", code: "e" },
                { name: "F", code: "f" },
                { name: "G", code: "g" },
            ],
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
    margin-bottom: rem;
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
h5 {
    margin: 1.5rem 0 1rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: var(--surface-900);
    font-size: 1.25rem;
}
.p-menu {
    border-radius: 12px;
}
</style>
