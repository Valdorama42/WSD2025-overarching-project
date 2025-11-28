<script>
    import { goto } from "$app/navigation";
    import { useAuthState } from "$lib/states/authState.svelte.js";

    let { data } = $props();
    let message = $state("");
    let errorMessage = $state("");
    let loading = $state(false);

    const authState = useAuthState();

    const handleForm = async (e) => {
        e.preventDefault();
        errorMessage = "";
        message = "";
        loading = true;

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        try {
            if (data.action === "login") {
                await authState.login(email, password);
                message = "Login successful! Redirecting...";
                setTimeout(() => goto("/"), 1000);
            } else {
                await authState.register(email, password);
                message = "Registration successful! You can now log in.";
                setTimeout(() => goto("/auth/login"), 1500);
            }
        } catch (error) {
            errorMessage = error.message || "An error occurred. Please try again.";
        } finally {
            loading = false;
        }
    };
</script>

<!-- WRAPPER (centered card layout) -->
<div class="flex justify-center items-center py-20 px-4">
    <div class="w-full max-w-md bg-white shadow-lg rounded-2xl border p-8 space-y-6">

        <!-- Title -->
        <h2 class="text-3xl font-semibold text-gray-900 text-center">
            {data.action === "login" ? "Login" : "Register"}
        </h2>

        <!-- Success message -->
        {#if message}
            <div class="rounded-md bg-green-50 border border-green-300 p-3 text-green-700 text-sm">
                {message}
            </div>
        {/if}

        <!-- Error message -->
        {#if errorMessage}
            <div class="rounded-md bg-red-50 border border-red-300 p-3 text-red-700 text-sm">
                {errorMessage}
            </div>
        {/if}

        <!-- FORM -->
        <form onsubmit={handleForm} class="space-y-4">
            <!-- Email -->
            <label class="block">
                <span class="text-sm font-medium text-gray-700">Email</span>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    class="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm 
                           focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 
                           outline-none transition"
                />
            </label>

            <!-- Password -->
            <label class="block">
                <span class="text-sm font-medium text-gray-700">Password</span>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    class="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm 
                           focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 
                           outline-none transition"
                />
            </label>

            <!-- Submit button -->
            <button
                type="submit"
                disabled={loading}
                class="w-full py-2.5 rounded-lg text-white font-medium
                       bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]
                       transition disabled:opacity-60 shadow-md"
            >
                {loading
                    ? "Please wait..."
                    : data.action === "login"
                        ? "Login"
                        : "Register"}
            </button>
        </form>

        <!-- Switch Link -->
        <p class="text-center text-sm text-gray-600">
            {#if data.action === "login"}
                Don't have an account?
                <a href="/auth/register" 
                   class="text-indigo-600 hover:underline font-medium">
                   Register here
                </a>.
            {:else}
                Already have an account?
                <a href="/auth/login"
                   class="text-indigo-600 hover:underline font-medium">
                    Login here
                </a>.
            {/if}
        </p>
    </div>
</div>
