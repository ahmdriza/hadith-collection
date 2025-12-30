'use client';

// Native HTML select for simplicity as we don't have the shim or radix UI installed yet
// This avoids the 'cannot find module' error while preserving the UI look

export default function SearchFilters() {
    return (
        <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Collection</label>
                <div className="relative">
                    <select className="block w-full min-w-[160px] rounded-md border-gray-200 text-sm focus:border-primary-500 focus:ring-primary-500 bg-white py-2 pl-3 pr-8 shadow-sm appearance-none cursor-pointer">
                        <option value="">All Collections</option>
                        <option value="bukhari">Sahih Bukhari</option>
                        <option value="muslim">Sahih Muslim</option>
                        <option value="abu-dawud">Sunan Abu Dawud</option>
                    </select>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Grade</label>
                <div className="relative">
                    <select className="block w-full min-w-[140px] rounded-md border-gray-200 text-sm focus:border-primary-500 focus:ring-primary-500 bg-white py-2 pl-3 pr-8 shadow-sm appearance-none cursor-pointer">
                        <option value="">Any Grade</option>
                        <option value="sahih">Sahih</option>
                        <option value="hasan">Hasan</option>
                        <option value="daif">Daif</option>
                    </select>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Language</label>
                <div className="relative">
                    <select className="block w-full min-w-[140px] rounded-md border-gray-200 text-sm focus:border-primary-500 focus:ring-primary-500 bg-white py-2 pl-3 pr-8 shadow-sm appearance-none cursor-pointer">
                        <option value="all">Arabic & English</option>
                        <option value="ar">Arabic Only</option>
                        <option value="en">English Only</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
