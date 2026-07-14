import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';
import HomeCarousel from '@/components/home-carousel';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-0 text-[#1b1b18] lg:justify-center lg:p-0 dark:bg-[#0a0a0a]">
                <header className="mb-0 w-full text-sm not-has-[nav]:hidden lg:max-full lg:p-6 bg-olive-500 dark:bg-gray-900">
                    {/* Left: Title */}
                    <div className="flex items-center justify-start gap-4 text-white lg:w-1/4 lg:float-left">
                        <p className="py-1.5"><strong>GM Toolkit</strong></p>
                    </div>
                    <nav className="flex items-center justify-end gap-4 lg:w-3/4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full flex-col-reverse lg:flex-row lg-grow h-full">
                        <HomeCarousel />
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
                <footer className="flex items-center justify-center w-full bg-olive-500 dark:bg-gray-900 py-6">
                    <p className="text-white py-6 text-xs">&copy; {new Date().getFullYear()} Brosnan Technology Consulting Ltd. Christopher Brosnan.</p>
                </footer>
            </div>
        </>
    );
}
