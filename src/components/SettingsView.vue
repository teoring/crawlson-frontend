<template>
    <div class="container">
        <div class="main-container">
            <div class="grid p-fluid">
                <div class="col-12 md:col-6">
                    <div class="card">
                        <h5 >Price</h5>
                        <div class="grid formgrid">
                            <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                                <label for="minHousePrice">Minimum house price</label>
                                <InputNumber aria-describedby="minHousePrice-help" mode="currency" :min="0" currency="EUR" :maxFractionDigits="0" showButtons :step="25000" v-model="user.min_house_price" inputId="minHousePrice" />
                            </div>
                            <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                                <label for="maxHousePrice">Maximum house price</label>
                                <InputNumber v-model="user.max_house_price" showButtons :maxFractionDigits="0" :min="0" :step="25000" mode="currency" currency="EUR" inputId="maxHousePrice" ></InputNumber>
                            </div>
                        </div>

                        <h5>House properties</h5>

                        <div class="grid formgrid">
                            <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                <label for="minLivingArea">Minimal living area</label>
                                <InputGroup>
                                    <InputNumber :min="0" :useGrouping="false" suffix=" m²" v-model="user.min_living_area" inputId="minLivingArea" />
                                </InputGroup>

                            </div>
                            <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                <label for="minConstructionYear">Built after (year)</label>
                                <InputGroup>
                                    <InputNumber :min="0" :useGrouping="false" v-model="user.min_construction_year" inputId="minConstructionYear" />
                                </InputGroup>

                            </div>
                            <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                <label for="minEnergyLabel">Min. Energy label</label>
                                <Dropdown v-model="user.min_energy_label" inputId="minEnergyLabel" optionLabel="name" :options="energyLabels" />
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <h5>Location</h5>
                        <div class="grid formgrid">
                            <div class="col-12 lg:col-10 lg:mb-0">
                                <label for="TravelAddress">Travel address</label>
                                <InputGroup>
                                    <InputText placeholder="" type="text" v-model="user.travel_time_address" inputId="TravelAddress"/>
                                </InputGroup>
                            </div>
                            <div class="col-12 lg:col-2 lg:mb-0">
                                <label for="TravelAddress">Map</label>
                                <Button icon="pi pi-arrow-right"  target="_blank" rel="noopener noreferrer" :href="getSelectedAddressGoogleMap()"  :disabled="!user.travel_time_address" outlined />
                            </div>
                        </div>

                        <h5>Travel time settings</h5>
                        <div class="grid formgrid">
                            <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                <label for="maxTravelTime">Max. travel time</label>
                                <InputGroup>
                                    <InputNumber suffix=" min" v-model="user.max_travel_time" :min="0" :useGrouping="false" inputId="maxTravelTime" />
                                </InputGroup>

                            </div>
                            <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                <label for="maxTravelDistance">Max distance</label>
                                <InputGroup>
                                    <InputNumber :min="0" suffix=" km" :useGrouping="false" v-model="user.max_travel_distance" inputId="maxTravelDistance" />
                                </InputGroup>
                            </div>
                            <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                                <label for="commuteMode">Commute Mode</label>
                                <Dropdown optionLabel="label" optionValue="value" v-model="user.commute_mode" inputId="commuteMode" :options="commuteModes" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 md:col-6">
                    <div class="card">
                        <h5>Cities</h5>
                        <div class="grid formgrid">
                            <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                                <Dropdown @change="onCityAdded" v-model="selectedCityFromList" filter :options="cityNames" optionLabel="name" optionValue="name"
                                    :virtualScrollerOptions="{ itemSize: 34 }" placeholder="Select a city" />
                            </div>
                            <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                                <Listbox emptyMessage="No cities added" class="mb-2" v-model="selectedCityFromAddedCities" :options="user.selected_cities" />
                                <Button id="selectedCityRemoveButton" :disabled="selectedCityFromAddedCities == null" outlined @click="deleteSelectedCity()" label="Remove" />
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
        if( ! this.user.selected_cities )
        {
            this.user.selected_cities = [ ];
        }
    },
    data() {
        return {
            selectedCityFromList: null,
            selectedCityFromAddedCities: null,
            cityNames: cityNames,
            user: this.$store.state.auth.user,
            energyLabels: [
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
            commuteModes: [
                { label: "Walking", value: "walking" },
                { label: "Driving", value: "driving" },
                { label: "Transit", value: "transit" },
                { label: "Bicycling", value: "bicycling" },
            ]
        };
    },
    methods: {
        onCityAdded( event ) {
            this.selectedCity = "";

            if( event.value && this.user.selected_cities.find( (element) => element == event.value ) == undefined )
            {
                this.user.selected_cities.push( event.value );
                this.showToast( "info", "Added " + event.value + " to the list of selected cities." );
            }
        },
        showToast( severity, message ){
            let topic = "";

            if( severity == "error") { topic = "setErrorMessage" }
            if( severity == "info") { topic = "setInfoMessage" }

            this.$store.commit( topic, message );

            setTimeout(() => {
                this.$store.commit( topic, "");
            }, 100);
        },
        deleteSelectedCity() {
            const index = this.user.selected_cities.indexOf( this.selectedCityFromAddedCities );
            if( index > -1 )
            {
                this.user.selected_cities.splice( index, 1 );
                this.showToast( "info", "Removed " + this.selectedCityFromAddedCities + " from the list of selected cities." );
            }
        },
        getSelectedAddressGoogleMap() {
            return "https://maps.google.com/?q=" + encodeURIComponent( this.user.travel_time_address );
        }
    },
};
</script>

<style>

</style>
``