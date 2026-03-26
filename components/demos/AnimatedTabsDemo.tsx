"use client";

import { AnimatedTabs } from "@/components/ui/animated-tabs"

const AnimatedTabsDemo = () => {
    return (
        <div className="w-full min-h-screen bg-black flex items-center justify-center p-8">
            <div className="w-full max-w-4xl">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Animated Content Tabs</h2>
                <div className="flex justify-center">
                    <AnimatedTabs />
                </div>
            </div>
        </div>
    )
}

export { AnimatedTabsDemo }
