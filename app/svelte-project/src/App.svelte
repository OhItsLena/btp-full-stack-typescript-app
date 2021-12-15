<script lang="ts">
    import "@ui5/webcomponents/dist/Button";
    import "@ui5/webcomponents-icons/dist/refresh.js";
    import "@ui5/webcomponents-icons/dist/add.js";
    import "@ui5/webcomponents-icons/dist/education.js";
    import "@ui5/webcomponents/dist/List.js";
    import "@ui5/webcomponents/dist/StandardListItem.js";
    import { onMount } from "svelte";
    import { store } from "./store";

    let promise;
    let id, name, descr, ects;

    onMount(() => {
        promise = store.get();
    });

    function handleCreate(event) {
        promise = store.create({
            ID: id,
            name: name,
            descr: descr,
            ects: ects
        });
        id = "";
        name = "";
        descr = "";
        ects = undefined;
    }
    function handleDelete(event) {
        promise = store.delete(event.detail.item.dataset.cid);
    }
</script>

<main>
    <h1><ui5-icon name="education" style="width:2rem;height:2rem;" /> Courses</h1>
    <div class="row">
        <div class="column">
            {#await promise}
                <ui5-list header-text="Fetching data ..." busy />
            {:then}
                <ui5-list
                    id="myList5"
                    mode="Delete"
                    on:item-delete={handleDelete}
                    style="height: 500px"
                    growing="Scroll"
                    header-text="All Courses"
                >
                    {#each $store as course}
                        <ui5-li data-cid={course.ID}>
                            {course.name}: {course.descr}
                        </ui5-li>
                    {/each}
                </ui5-list>
            {:catch error}
                <p style="color: red">{error.message}</p>
                <ui5-button
                    design="Emphasized"
                    icon="refresh"
                    on:click={() => {
                        promise = store.get();
                    }}
                >
                    Try reload
                </ui5-button>
            {/await}
        </div>
        <div class="column">
            <h2>Create new Course</h2>
            <form>
                <label for="id">ID:</label>
                <input type="text" id="id" name="id" bind:value={id} />
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" bind:value={name} />
                <label for="descr">Description:</label>
                <input type="text" id="descr" name="descr" bind:value={descr} />
                <label for="ects">ECTS:</label>
                <input type="number" id="ects" name="ects" bind:value={ects} />
            </form>
            <ui5-button design="Emphasized" icon="add" on:click={handleCreate}>Add Course</ui5-button>
        </div>
    </div>
</main>

<style>
    .row {
        display: flex;
        flex-wrap: wrap;
        column-gap: 10vw;
    }

    @media screen and (min-width: 900px) {
        .column {
            flex: 1;
        }
    }
</style>
