<script>
    import Main from "../../../games/snake/main.svelte";
</script>



<div class="content">
    <Main/>
</div>




<style>
    :root {
        --main-color: #15142A;
        --second-color: #FFF3E2;
        --third-color: #e0d3af;
        --fourth-color: #4a5c80;
        --accent-color: #A18F7C;
    }

    .content {
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 600px) {
        .content {
            height: 100svh;
        }
    }
</style>