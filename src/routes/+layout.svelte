<script>
    import Navbar from '$lib/navbar.svelte';
    import Footer from '$lib/footer.svelte';
    import "../app.css"
    </script>
    
    <Navbar />
    <slot />
    <Footer />