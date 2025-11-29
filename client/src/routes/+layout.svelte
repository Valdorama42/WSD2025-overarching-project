<script>
    import "../app.css";
    import Header from "$lib/components/layout/Header.svelte";
    import Footer from "$lib/components/layout/Footer.svelte";

    
    let { children } = $props();

    $effect(() => {
        document.body.classList.add("e2e-ready");
    })

</script>

<div class="flex flex-col h-full">
    <Header />

    <main class="grow mx-auto w-full max-w-6xl px-8 py-8">
        {@render children()}
    </main>

    <Footer />
</div>