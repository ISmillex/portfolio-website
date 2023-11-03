<script>
    import Main from "../../../games/2048/main.svelte";
</script>


<div class="content">
    <Main />
</div>



<style>

    .content {
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :root {
        --main-color: #15142A;
        --second-color: #FFF3E2;
        --third-color: #e0d3af;
        --fourth-color: #4a5c80;
        --accent-color: #A18F7C;
    }

    @media (max-width: 600px) {
        .content {
            height: 100svh;
        }
    }

</style>