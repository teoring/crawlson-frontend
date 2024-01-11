<script>
import { ref } from "vue";

export default {
    name: "Trends"
}
</script>

<template>

<div class="main-container">
    <div class="skeleton-item">
                            <Skeleton class="mb-2"></Skeleton>
                            <Skeleton width="10rem" class="mb-2"></Skeleton>
                            <Skeleton width="5rem" class="mb-2"></Skeleton>
                            <Skeleton height="2rem" class="mb-2"></Skeleton>
                            <Skeleton width="10rem" height="4rem"></Skeleton>
                        </div>
</div>
<div
                class="px-4 py-5 shadow-2 flex flex-column md:flex-row md:align-items-center justify-content-between mb-3"
                style="border-radius: 1rem; background: linear-gradient(0deg, rgba(0, 123, 255, 0.5), rgba(0, 123, 255, 0.5)), linear-gradient(92.54deg, #1c80cf 47.88%, #ffffff 100.01%)"
            >
    <div>
        <div class="text-blue-100 font-medium text-xl mt-2 mb-3">TAKE THE NEXT STEP</div>
        <div class="text-white font-medium text-5xl">Try PrimeBlocks</div>
    </div>
    <div class="mt-4 mr-auto md:mt-0 md:mr-0">
        <a href="https://www.primefaces.org/primeblocks-vue" class="p-button font-bold px-5 py-3 p-button-warning p-button-rounded p-button-raised"> Get Started </a>
    </div>
</div>
</template>

<style lang="scss" scoped></style>