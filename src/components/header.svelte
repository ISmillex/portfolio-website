<script>
  import {stores} from '$lib/stores.js'

  import Hamburger from './hamburger.svelte'
  import Overlay from './overlay.svelte'


  function handleLogoClick() {
    document.body.scrollIntoView();
    document.body.style.overflow = "visible";
    document.body.style.touchAction = "auto";
    if ($stores.isOverlayOpen) {
      $stores.isOverlayOpen = false;
    }
  }
</script>



<div class="navbar">
  <a href="/" class="logo"  on:click={handleLogoClick} class:overlayOpen={$stores.isOverlayOpen}>Archyn Mikhailov</a>
  <Hamburger/>
</div>
<Overlay/>





<style>

  .navbar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100px;
    mix-blend-mode: difference;
    background-color: transparent;
    z-index: 50;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    align-items: center;
    display: flex;
    position: relative;
    left: 50px;
    height: 100%;
    font-size: 24px;
    font-weight: 600;
    transition: 0.3s;
    color: white;
    text-decoration: none;
    letter-spacing: 2.62px;
  }

  .logo:hover {
    transform: scale(1.05);
    transition: 0.3s;

  }

  @media screen and (max-width: 428px) {
    .navbar {
      height: 50px;
    }

    .logo {
      font-size: 12px;
      left: 15px;
    }
  }
</style>
  