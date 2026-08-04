(() => {
    const nav = document.querySelector(".nav");
    const toggle = document.querySelector(".nav-toggle");
    const panel = document.querySelector(".nav-links");
    if (!nav || !toggle || !panel) return;

    const mq = window.matchMedia("(max-width: 860px)");

    const setOpen = (open) => {
        nav.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
        document.body.classList.toggle("nav-open", open && mq.matches);
        if (mq.matches) {
            panel.hidden = !open;
        } else {
            panel.hidden = false;
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Abrir menú");
            document.body.classList.remove("nav-open");
        }
    };

    const syncForViewport = () => {
        if (mq.matches) {
            setOpen(false);
        } else {
            panel.hidden = false;
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("nav-open");
        }
    };

    toggle.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") !== "true";
        setOpen(open);
    });

    panel.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (mq.matches) setOpen(false);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setOpen(false);
    });

    document.addEventListener("click", (event) => {
        if (!mq.matches || !nav.classList.contains("is-open")) return;
        if (!nav.contains(event.target)) setOpen(false);
    });

    mq.addEventListener("change", syncForViewport);
    syncForViewport();
})();
