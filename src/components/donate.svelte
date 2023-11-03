<script>
    import { onMount, onDestroy } from 'svelte';

    let script;

    const loadScript = () => {

        // let id = 'archyn'; // replace with your Buy Me a Coffee user ID
        // let description = 'Support me on Buy me a coffee!'; // replace with your desired description
        // let color = '#5F7FFF'; // replace with your desired color
        //
        // let url = "https://www.buymeacoffee.com/widget/page/" + encodeURIComponent(id)
        //     + "?description=" + encodeURIComponent(description)
        //     + "&color=" + encodeURIComponent(color);
        //
        // console.log(url);

        script = document.createElement('script');
        script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
        script.dataset.name = 'BMC-Widget';
        script.dataset.id = 'archyn';
        script.dataset.description = 'Support me on Buy me a coffee!';
        script.dataset.color = '#5F7FFF';
        script.dataset.position = 'Right';
        script.dataset.x_margin = '18';
        script.dataset.y_margin = '18';
        script.dataset.z_index = '0';
        script.async = true;
        script.onload = () => {
            window.dispatchEvent(new Event('DOMContentLoaded', { bubbles: false, cancelable: false }));
        };
        document.head.appendChild(script);
    };

    const removeScript = () => {
        document.head.removeChild(script);
        const widgetBtn = document.getElementById("bmc-wbtn");
        if (widgetBtn) {
            document.body.removeChild(widgetBtn);
        }
    };

    onMount(loadScript);
    onDestroy(removeScript);
</script>


