<template>
    <div class="container">
        <div class="topbard">
            <img class="logo" src="/logo_2.png" alt="logo" />
        </div>
    </div>
</template>


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
.main-container {
    margin-left: 232px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
    padding: 6.5rem 2rem 2rem 4rem;
    transition: margin-left 0.2s;
}

.card {
    background: var(--surface-card);
    border: 1px solid var(--surface-border);
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: var(--card-shadow);
    border-radius: 12px;
}

.layout-menu .layout-root-menuitem > .layout-menuitem-root-text {
    font-size: 0.857rem;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--surface-900);
    margin: 0.75rem 0;
}
</style>
