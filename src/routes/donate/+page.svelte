<script>

</script>



<div class="donate-content">
    <div class="wrapper">
        <div class="text-content">
            <div class="title">Donate me</div>
            <div class="text">By buying me a virtual coffee, you become an essential part of my creative process.
                              Your generosity directly supports my projects, helps me acquire the resources I need,
                              and allows me to dedicate more time to what I love.</div>
            <div class="sub-text">You can donate through widget bellow or <a href="https://www.buymeacoffee.com/archyn">click to link</a></div>
        </div>
<!--        <iframe title="" src="https://www.buymeacoffee.com/widget/page/archyn?color=%235F7FFF"></iframe>-->
    </div>
</div>



<style>

    :root {
        --main-color: #15142A;
        --second-color: #FFF3E2;
        --third-color: #e0d3af;
        --fourth-color: #4a5c80;
        --accent-color: #A18F7C;
    }


    .donate-content {
        width: 100%;
        height: 60vh;
        display: flex;
        margin-top: 5%;
    }

    .wrapper {
        width: 75%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: auto;
    }

    .text-content {
        width: 100%;
        min-height: 65vh;
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .title {
        display: flex;
        position: relative;
        letter-spacing: 4px;
        font-size: 15px;
        color: #878a8f;
    }

    .text {
        margin-top: 20px;
        display: flex;
        position: relative;
        font-size: 40px;
        font-weight: 800;
        text-align: center;

    }

    .sub-text {
        width: 85%;
        font-size: 20px;
        margin-top: 20px;
        color: #878a8f;
        font-weight: 500;
        text-align: center;
    }

    a {
        font-weight: 500;
        color: var(--accent-color);
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }



    @media only screen and (max-width: 600px) {
        .donate-content {
            height: 100%;
            margin-top: 25%;
        }

        .wrapper {
            width: 100%;
            height: 100%;
        }

        .text-content {
            width: 100%;
            min-height: 100%;
            align-items: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .title {
            display: flex;
            position: relative;
            letter-spacing: 4px;
            font-size: 15px;
            color: #878a8f;
        }

        .text {
            margin-top: 20px;
            display: flex;
            position: relative;
            font-size: 30px;
            font-weight: 800;
            text-align: center;

        }

        .sub-text {
            width: 85%;
            font-size: 17px;
            margin-top: 20px;
            color: #878a8f;
            font-weight: 500;
            text-align: center;
        }

        a {
            font-weight: 500;
            color: var(--accent-color);
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
    }


</style>