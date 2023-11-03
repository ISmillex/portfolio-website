<script>
    import {stores} from "$lib/stores.js";
</script>


<div class="custom-cursor" id="custom-cursor"
     style="left: {$stores.cursor.x}px;
            top: {$stores.cursor.y}px;
            transform: translate(-50%, -50%) scale({$stores.cursor.scale});">

            <div class="earth-orbit orbit" id="earth-orbit">
                <div class="planet earth"></div>
                <div class="venus-orbit orbit">
                    <div class="planet venus"></div>
                    <div class="mercury-orbit orbit">
                        <div class="planet mercury"></div>
                    </div>
                </div>
            </div>
</div>

<style>



    .custom-cursor {
        width: 35px;
        height: 35px;
        display: flex;
        position: fixed;
        justify-content: center;
        align-items: center;
        pointer-events: none;
        z-index: 1000;
        border-radius: 50%;
        background-color: #FFF3E2;
        mix-blend-mode: difference;
        transition: transform  0.5s ease-in-out;
    }

    .orbit {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #FFF3E2;
        border-radius: 50%;
    }

    .earth-orbit {
        width: 105px;
        height: 105px;
        animation: spin 14s linear 0s infinite;
    }

    .venus-orbit {
        width: 80px;
        height: 80px;
        animation: spin 12s linear 0s infinite;
    }

    .mercury-orbit {
        width: 55px;
        height: 55px;
        animation: spin 10s linear 0s infinite;
    }

    .planet {
        position: absolute;
        top: -5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: white;
    }

    @keyframes spin {
        from {
            transform: rotate(0);
        }
        to{
            transform: rotate(359deg);
        }
    }

    @media (max-width: 768px) {
        .custom-cursor {
            display: none;
        }
    }


</style>
