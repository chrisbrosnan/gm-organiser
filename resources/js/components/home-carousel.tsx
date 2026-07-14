import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';

export default function HomeCarousel() {

    // Every 3 seconds, change the carousel item - removed hidden from the active item and add hidden to the next item, and add active to the next item
    setInterval(() => {
        const activeItem = document.querySelector('[data-carousel-item]:not(.hidden)') || document.querySelector('[data-carousel-item]:first-child') as HTMLElement | null;
        const nextItem = activeItem?.nextElementSibling as HTMLElement | null || document.querySelector('[data-carousel-item]:first-child') as HTMLElement | null;

        if (activeItem && nextItem) {
            activeItem.classList.add('hidden');
            nextItem.classList.remove('hidden');
        }
    }, 3000);

    return (
        <>
            {/* Create Carousel for Home Page Hero Section */}
            {/* Make carousel full height of the parent container */}
            <div id="default-carousel" className="relative w-full py-4 px-6 h-full" data-carousel="slide">
                <div className="relative h-full overflow-hidden rounded-base md:h-96">
                    {/* Item 1 */}
                    <div className="hidden duration-700 ease-in-out h-full" data-carousel-item>
                        <img src="/docs/images/carousel/carousel-1.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        <h2 className="text-white text-2xl">Prepare</h2>
                        <p className="text-white text-sm">Always be ready for a session ahead of time. Collect your notes and data on locations, NPCs, items and quests to ensure your players have a fantastic experience.</p>
                    </div>
                    {/* Item 2 */}
                    <div className="hidden duration-700 ease-in-out h-full" data-carousel-item>
                        <img src="/docs/images/carousel/carousel-2.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        <h2 className="text-white text-2xl">Organise</h2>
                        <p className="text-white text-sm">Keep your sessions structured and your players engaged by organising your notes, maps, and resources effectively.</p>
                    </div>
                    {/* Item 3 */}
                    <div className="hidden duration-700 ease-in-out h-full" data-carousel-item>
                        <img src="/docs/images/carousel/carousel-3.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        <h2 className="text-white text-2xl">Remind</h2>
                        <p className="text-white text-sm">Have you forgotten a key NPC detail or plot hook? Remind yourself of it before your next session (or briefly during) to keep the story consistent and engaging.</p>
                    </div>
                    {/* Item 4 */}
                    <div className="hidden duration-700 ease-in-out h-full" data-carousel-item>
                        <img src="/docs/images/carousel/carousel-4.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        <h2 className="text-white text-2xl">Share</h2>
                        <p className="text-white text-sm">Share your notes, maps, and resources with your players to enhance their experience and keep them engaged in the story.</p>
                    </div>
                    {/* Item 5 */}
                    <div className="hidden duration-700 ease-in-out h-full" data-carousel-item>
                        <img src="/docs/images/carousel/carousel-5.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        <h2 className="text-white text-2xl">Converse</h2>
                        <p className="text-white text-sm">Reach out to a community of fellow game masters and players to exchange ideas, tips, and experiences on running pre-written modules or your own homebrew creations.</p>
                    </div>
                </div>
                {/* Slider indicators */}
                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                    <button type="button" className="w-3 h-3 rounded-base" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                    <button type="button" className="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                    <button type="button" className="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                    <button type="button" className="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                    <button type="button" className="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                </div>
                {/* Slider controls */}
                <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-5 h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/></svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-5 h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>
        </>
    );
}
