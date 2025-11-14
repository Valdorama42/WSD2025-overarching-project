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

<h1>{data.action === "login" ? "Login" : "Register"}</h1>

{#if message}
    <div>
        <p class="message success">{message}</p>
    </div>
{/if}

{#if errorMessage}
    <div>
        <p class="message error">{errorMessage}</p>
    </div>
{/if}

<form onsubmit={handleForm}>
    <label>
        <span>Email:</span>
        <input
            id="email" 
            type="email" 
            name="email"
            placeholder="your@email.com" 
            required 
        />
    </label>
    <br />
    <label>
        <span>Password:</span>
        <input 
            id="password" 
            type="password" 
            name="password"
            placeholder="Enter your password" 
            required 
        />
    </label>
    <br />
    <button type="submit" disabled={loading}>
        {loading 
            ? "Please wait..."
            : data.action === "login" 
                ? "Login" 
                : "Register"}
    </button>
</form>

{#if data.action === "login"}
    <p>
        Don't have an account? 
        <a href="/auth/register">Register here</a>.
    </p>
{:else}
    <p>
        Already have an account? 
        <a href="/auth/login">Login here</a>.
    </p>
{/if}