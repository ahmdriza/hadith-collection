import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-primary-100 mt-8 md:mt-12">
            <div className="max-w-7xl mx-auto px-3 md:px-6 py-8 md:py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg text-primary-800">
                            IslamQA<span className="text-primary-500 font-normal">.Ref</span>
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            An authentic collection of Prophetic traditions (Hadith) adhering to the methodology of the Salaf-us-Salih.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Collections</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link href="/collections/sahih-bukhari" className="hover:text-primary-600 transition-colors">Sahih al-Bukhari</Link></li>
                            <li><Link href="/collections/sahih-muslim" className="hover:text-primary-600 transition-colors">Sahih Muslim</Link></li>
                            <li><Link href="/collections/sunan-abu-dawud" className="hover:text-primary-600 transition-colors">Sunan Abu Dawud</Link></li>
                            <li><Link href="/collections" className="hover:text-primary-600 font-medium mt-2 inline-block transition-colors">View All →</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link href="/topics" className="hover:text-primary-600 transition-colors">Browse Topics</Link></li>
                            <li><Link href="/search" className="hover:text-primary-600 transition-colors">Advanced Search</Link></li>
                            <li><Link href="/saved" className="hover:text-primary-600 transition-colors">Saved Hadiths</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Information</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><span className="text-gray-400">About Us (Coming Soon)</span></li>
                            <li><span className="text-gray-400">Contact (Coming Soon)</span></li>
                            <li><span className="text-gray-400">API Access (Coming Soon)</span></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-xs md:text-sm text-gray-500">
                    © {currentYear} IslamQA.Ref Hadith Collection. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
