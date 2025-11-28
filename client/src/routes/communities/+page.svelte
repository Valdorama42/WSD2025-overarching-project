<script>
    import { initCommunities } from "$lib/states/communityState.svelte.js";
    import CommunityList from "$lib/components/communities/CommunityList.svelte";
    import CommunityForm from "$lib/components/communities/CommunityForm.svelte";

    $effect(() => {
        initCommunities();
    });
</script>

<h1 class="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
    Communities
</h1>

<div>
    <!-- Form Section -->
    <section class="mx-auto w-full">
        <CommunityForm />
    </section>

    <!-- List Section -->
    <section>
        <CommunityList />
    </section>
</div>
