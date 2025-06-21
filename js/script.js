document.addEventListener('DOMContentLoaded', () => {

    // --- DATA --- //
    const testimonials = [
        { name: "Jane Doe", title: "CEO, Example Inc.", quote: "This product transformed our workflow! Highly recommended.", avatar: "images/avatars/placeholder.png" },
        { name: "John Smith", title: "Developer, Tech Solutions", quote: "Incredibly easy to set up and use. Saved us countless hours.", avatar: "images/avatars/placeholder.png" },
        { name: "Alice Brown", title: "Marketing Manager, Startup Co.", quote: "The perfect solution we were looking for. Excellent support too!", avatar: "images/avatars/placeholder.png" },
    ];

    const plans = [
        { title: "Free Plan", description: "Get started with the basics", price: 0, isPro: false, features: [{ text: "Up to 3 projects", included: true }, { text: "Basic analytics", included: true }, { text: "Community support", included: true }, { text: "Custom domains", included: false }, { text: "Priority support", included: false }] },
        { title: "Pro Plan", description: "Unlock powerful features", price: 10, isPro: true, features: [{ text: "Unlimited projects", included: true }, { text: "Advanced analytics", included: true }, { text: "Community support", included: true }, { text: "Custom domains", included: true }, { text: "Priority email support", included: true }] }
    ];

    const faqItems = [
        { question: "Is it easy to integrate?", answer: "Yes, integration is straightforward with our comprehensive documentation." },
        { question: "What is the pricing model?", answer: "We offer various tiers, including a free plan. Check our pricing section for details." },
        { question: "Can I customize the appearance?", answer: "Absolutely! The components are built with Tailwind CSS, making customization easy." },
        { question: "Do you offer support?", answer: "Yes, we provide email support for all plans and priority support for premium tiers." },
    ];
    
    const features = [
        { name: 'Next.js', description: 'App Router, Server Actions, and more.'},
        { name: 'Tailwind CSS', description: 'UI components built with Tailwind CSS.'},
        { name: 'PostgreSQL', description: 'Prisma ORM for database management.'},
        { name: 'Lucia Auth', description: 'Authentication using Lucia Auth.'},
        { name: 'UploadThing', description: 'Easy file uploads.'},
        { name: 'React Email', description: 'Simple email sending with Resend.'},
        { name: 'Internationalization', description: 'Multi-language support (i18n).'},
        { name: 'Stripe', description: 'Subscription payments with Stripe.'},
        { name: 'Vercel', description: 'Ready for Vercel deployment.'}
    ];

    // --- HELPER FUNCTIONS --- //
    // Formats large numbers into k, M, etc.
    function nFormatter(num, digits) {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        const item = lookup.slice().reverse().find(item => num >= item.value);
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    }
    
    // Check mark SVG
    const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M20 6 9 17l-5-5"></path></svg>`;

    // --- RENDER FUNCTIONS --- //

    // Renders Testimonials
    function renderTestimonials() {
        const grid = document.getElementById('testimonials-grid');
        if (!grid) return;
        let html = '';
        testimonials.forEach(t => {
            html += `
                <div class="flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-6">
                    <div class="flex items-center gap-4 mb-4">
                        <img class="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-600" src="${t.avatar}" alt="${t.name}">
                        <div>
                            <p class="font-bold text-gray-900 dark:text-white">${t.name}</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">${t.title}</p>
                        </div>
                    </div>
                    <div>
                        <p class="italic text-gray-600 dark:text-gray-300">"${t.quote}"</p>
                    </div>
                </div>
            `;
        });
        grid.innerHTML = html;
    }

    // Renders Pricing Plans
    function renderPricing() {
        const grid = document.getElementById('pricing-grid');
        if (!grid) return;
        let html = '';
        plans.forEach(plan => {
            const proClasses = plan.isPro ? 'border-2 border-blue-500 shadow-lg' : 'border border-gray-200 dark:border-gray-700';
            html += `
                <div class="relative flex flex-col rounded-lg ${proClasses} transition duration-200 ease-in-out">
                    <div class="p-6">
                        <h3 class="text-xl font-bold">${plan.title}</h3>
                        <p class="text-gray-500 dark:text-gray-400 mt-1">${plan.description}</p>
                    </div>
                    <div class="flex-1 p-6 pt-0">
                        <p class="mb-6 mt-2 flex items-baseline justify-center gap-x-2">
                            <span class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">$${plan.price}</span>
                            <span class="text-sm font-semibold leading-6 tracking-wide text-gray-500 dark:text-gray-400">/month</span>
                        </p>
                        <ul class="space-y-3 text-sm">
                            ${plan.features.map(feature => `
                                <li class="flex items-center gap-2">
                                    <span class="${feature.included ? 'text-blue-500' : 'text-gray-400'}">${checkIcon}</span>
                                    <span class="${!feature.included ? 'text-gray-400 line-through' : 'text-gray-800 dark:text-gray-200'}">${feature.text}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="p-6 pt-0 justify-center">
                        <a href="#" class="w-full inline-flex items-center justify-center rounded-md text-sm font-medium h-12 px-6 ${plan.isPro ? 'bg-gray-900 dark:bg-gray-50 text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200' : 'border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'}">
                            ${plan.isPro ? 'Upgrade to Pro' : 'Get Started'}
                        </a>
                    </div>
                </div>
            `;
        });
        grid.innerHTML = html;
    }
    
    // Renders Features
    function renderFeatures() {
        const grid = document.getElementById('features-grid');
        if(!grid) return;
        let html = '';
        features.forEach(feature => {
            html += `
            <div class="flex h-[160px] flex-col justify-center items-center rounded-md p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <p class="font-bold text-lg mb-2">${feature.name}</p>
                <p class="text-balance text-sm text-gray-500 dark:text-gray-400">
                    ${feature.description}
                </p>
            </div>
            `;
        });
        grid.innerHTML = html;
    }

    // Renders FAQ
    function renderFaq() {
        const accordion = document.getElementById('faq-accordion');
        if (!accordion) return;
        let html = '';
        faqItems.forEach((item, index) => {
            html += `
                <div class="border-b border-gray-200 dark:border-gray-700">
                    <h2>
                        <button type="button" class="faq-trigger flex justify-between items-center w-full p-5 font-medium text-left text-gray-800 dark:text-gray-200" aria-expanded="false">
                            <span>${item.question}</span>
                            <svg class="w-3 h-3 rotate-0 shrink-0 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/></svg>
                        </button>
                    </h2>
                    <div class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                        <div class="p-5 border-t-0">
                            <p class="text-gray-500 dark:text-gray-400">${item.answer}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        accordion.innerHTML = html;

        // Add event listeners for the accordion
        const triggers = accordion.querySelectorAll('.faq-trigger');
        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const content = trigger.parentElement.nextElementSibling;
                const icon = trigger.querySelector('svg');
                const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

                trigger.setAttribute('aria-expanded', !isExpanded);
                if (!isExpanded) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    content.style.maxHeight = '0px';
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }

    // Fetches GitHub Stars
    async function fetchGitHubStars() {
        const starElement = document.getElementById('github-stars');
        if (!starElement) return;
        try {
            const response = await fetch("https://api.github.com/repos/moinulmoin/chadnext");
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const stars = data.stargazers_count;
            starElement.textContent = nFormatter(stars, 1);
        } catch (error) {
            console.error("Failed to fetch GitHub stars:", error);
            starElement.textContent = '10k+'; // Fallback
        }
    }

    // --- INITIALIZE --- //
    renderTestimonials();
    renderPricing();
    renderFeatures();
    renderFaq();
    fetchGitHubStars();
});
