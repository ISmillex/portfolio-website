<script>
    import projects from "$lib/projects.json"
    import Swiper from 'swiper';
    import {onMount} from "svelte";
    import {stores} from "$lib/stores.js";
    import {page} from "$app/stores";


    let swiper;

    onMount(() => {
        $stores.swiper = new Swiper(".swiper", {
            direction: 'horizontal',
            loop: true,
            on: {
                slideChange: function () {
                    $stores.currentProjectIndex = this.realIndex
                    console.log($stores.currentProjectIndex)
                    focusCurrentProject(false);
                },
            }
        });
        $stores.currentProjectIndex = parseInt($page.url.searchParams.get('id')) || 0;
       changeSlide($stores.currentProjectIndex);
    })


    function changeSlide(index) {
        $stores.swiper.slideToLoop(index);
        focusCurrentProject(true);
    }

    function focusCurrentProject(shouldScroll) {
        const projectCards = document.querySelectorAll('#project-card');
        projectCards.forEach((card, index) => {
            if (index === $stores.currentProjectIndex) {
                card.style = 'transform: scale(1.05); box-shadow: 0 0 20px rgba(0,0,0,0.3);';
                if (shouldScroll || $page.url.searchParams.get('id')) {
                    swiper.scrollIntoView({behavior: "smooth"});
                }
            } else {
                card.style = 'transform: scale(1); box-shadow: 0 0 10px rgba(0,0,0,0.1);';
            }
        });
    }

</script>


<div class="content">
    <section style="height: fit-content; margin-top: 10%;" >
        <div class="wrapper">
            <div class="text-content">
                <div class="title">CURRENT PROJECTS</div>
                <div class="text">Browse through my latest projects along with relevant insights and detailed descriptions</div>
                <div class="sub-text">Feel free to explore, suggest, or discuss any of these projects or contact me for any collaboration</div>
            </div>

            <div class="project-cards">
                {#each projects as project}
                    <div class="project-card" id="project-card" on:click={()=>{changeSlide(project.id)}}>
                        <div class="title" >{project.name}</div>
                        <div class="date" >{project.startDate} - {project.endDate}</div>
                        <div class="category" >{project.category}</div>
                    </div>
                {/each}
            </div>
        </div>
    </section>
    <section >
        <div class="swiper" bind:this={swiper}>
            <div class="swiper-wrapper">
                {#each projects as project}
                    <div class="swiper-slide">
                        <div class="project-slide">
                            <div class="container">
                                <div class="project-info">
                                    <div class="title">Project</div>
                                    <div class="main-value">{project.name}</div>
                                    <div class="title">My Role</div>
                                    <div class="value">{project.role}</div>
                                    <div class="title">Categories</div>
                                    <div class="value">{project.category}</div>
                                    <div class="title">ClientService</div>
                                    <div class="value">{project.client}</div>
                                    <div class="title">Date</div>
                                    <div class="value">{project.startDate} - {project.endDate}</div>
                                    <div class="title">Link</div>
                                    <a class="value" href={project.link}>{project.linkName}</a>
                                </div>
                                <div class="project-description">
                                    <p>{project.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

</div>

<style>
    .content {
        height: fit-content;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    section {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .wrapper {
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto;
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
    }

    .sub-text {
        width: 85%;
        margin-top: 20px;
        font-size: 20px;
        color: #878a8f;
        font-weight: 500;
    }

    .project-cards {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin-top: 10%;
    }

    .text-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .project-card {
        width: 30%;
        height: 100px;
        background-color: #fff;
        border-radius: 10px;
        margin: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        transition: all 0.3s ease-in-out;
    }

    .project-card .title {
        font-size: 15px;
        font-weight: 600;
        color: black;
        margin-bottom: 10px;
    }

    .project-card .date {
        font-size: 13px;
        font-weight: 500;
        color: #878a8f;
        margin-bottom: 10px;
        text-align: left;
    }

    .project-card .category {
        font-size: 13px;
        font-weight: 500;
        color: #878a8f;
    }


    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-wrapper {
        position: absolute;
    }

    .swiper-slide {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .project-slide {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container {
        width: 80%;
        height: 80%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .project-info {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .project-info .title {
        font-size: 15px;
        font-weight: 600;
        color: #878a8f;
        margin-bottom: 5px;
    }

    .project-info .main-value {
        width: 70%;
        font-size: 40px;
        font-weight: 800;
        color: black;
        margin-bottom: 50px;
        margin-left: -2px;
    }

    .project-info .value {
        font-size: 20px;
        font-weight: 500;
        color: black;
        margin-bottom: 20px;
    }
    .project-description {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .project-description p {
        font-size: 20px;
        letter-spacing: 1px;
        line-height: 1.55;
    }


    @keyframes jump {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(10px);
        }
        100% {
            transform: translateY(0);
        }
    }

    @media screen and (max-width: 428px){
        .text-content {
            margin-top: 20%;
        }
        .text {
            font-size: 30px;
        }
        .sub-text {
            font-size: 15px;
        }
        .project-card {
            width: 90%;
        }

        .swiper-slide {
            margin-top: 10%;
        }


        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            align-self: center;
            height: 80%;
            width: 80%;
            overflow-y: auto;
        }

        .project-info {
            width: 98%;
            height: fit-content;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;

        }

        .project-info .main-value {
            width: 100%;
            font-size: 30px;
            font-weight: 800;
            color: black;
            margin-bottom: 50px;
            margin-left: -2px;
        }

        .project-description {
            width: 98%;
            height: fit-content;
            display: flex;
            align-items: flex-start;
        }

        .project-description p {
            width: 100%;
            height: 100%;
            font-size: 15px;
            letter-spacing: 1px;
            line-height: 1.55;
            text-align: left;
        }
    }
</style>