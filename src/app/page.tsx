'use client'

import ScheduleCard from "@/components/ScheduleCard";

export default function Home() {
    // TODO: darkmode: have some divs light, dont make entirely black, bad contrast
    // * \-> same for light mode, add some black or at least dont make it entirely white
    return (
        <main className="transition-all flex h-screen flex-col justify-center align-center items-center dark:bg-slate-950 dark:text-white bg-slate-50 text-black">
            <ScheduleCard date={"test"} />
        </main>
    )
}