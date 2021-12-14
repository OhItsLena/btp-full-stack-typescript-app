<script lang="ts">
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
    function handleDelete(ID) {
        promise = store.delete(ID);
    }
</script>

<main>
    <h1>🎓Courses</h1>
    <div class="row">
        <div class="column">
            {#await promise}
                <p>...waiting</p>
            {:then}
                <ul>
                    {#each $store as course}
                        <li>
                            {course.name}: {course.descr}
                            <button class="del" on:click={() => handleDelete(course.ID)}>❌</button>
                        </li>
                    {/each}
                </ul>
            {:catch error}
                <p style="color: red">{error.message}</p>
                <button
                    on:click={() => {
                        promise = store.get();
                    }}>🔄 Try reload</button
                >
            {/await}
        </div>
        <div class="column">
            <h2>Create new Course</h2>
            <form>
                <label for="id">ID:</label><br />
                <input type="text" id="id" name="id" bind:value={id} /><br />
                <label for="name">Name:</label><br />
                <input type="text" id="name" name="name" bind:value={name} /><br /><br />
                <label for="descr">Description:</label><br />
                <input type="text" id="descr" name="descr" bind:value={descr} /><br /><br />
                <label for="ects">ECTS:</label><br />
                <input type="number" id="ects" name="ects" bind:value={ects} /><br /><br />
            </form>
            <button on:click={handleCreate}>Add Course</button>
        </div>
    </div>
</main>

<style>
    button.del {
        background: transparent;
        border: none;
    }

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
