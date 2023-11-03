<script>
    import Home from "../components/home.svelte";
    import About from "../components/about.svelte";
    import Projects from "../components/projects.svelte";
    import Contact from "../components/contact.svelte";
    import Footer from "../components/footer.svelte";
</script>



<Home/>
<div class="container">
    <About/>
    <Projects/>
    <Contact/>
    <Footer/>
</div>



<style>

    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #15142A;
        background: radial-gradient(#1F1E34, #15142A);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }


    :root {
        --main-color: #15142A;
		--second-color: #FFF3E2;
		--third-color: #e0d3af;
		--fourth-color: #4a5c80;
		--accent-color: #A18F7C;
	}

</style>