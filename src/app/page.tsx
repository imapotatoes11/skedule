'use client'
import ScheduleCard from "@/components/ScheduleCard";
import {useEffect, useState} from "react";
import {DatePicker} from '@nextui-org/date-picker';
import {Tooltip} from "@nextui-org/tooltip";
import {parseDate} from "@internationalized/date";
import {ArrowPathIcon} from "@heroicons/react/24/solid";

export default function Home() {
    // TODO: darkmode: have some divs light, dont make entirely black, bad contrast
    // * \-> same for light mode, add some black or at least dont make it entirely white

    // ? future to do:
    // ? * highlight active period
    // ? * grey out past periods
    const [date, setDate] = useState("2021-10-10");
    useEffect(() => {
        const currentDate = new Date().toISOString().split("T")[0]
        setDate(currentDate);
    }, []);
    return (
        <main
            className="transition-all flex h-screen flex-row justify-between align-center items-center dark:bg-slate-950 dark:text-white bg-slate-50 text-black">
            <button>lb</button>
            <div className="flex flex-col items-center gap-6">
                <div className="flex flex-row items-center gap-6">
                    <DatePicker label="Choose a Date" value={parseDate((date))} onChange={(newDate) => setDate(newDate.toString())} className="min-w-[284px]"/>
                    <Tooltip content="Reset Date" className="cursor-pointer">
                        <button onClick={() => setDate(new Date().toISOString().split("T")[0])}><ArrowPathIcon className="size-6 text-black dark:text-white"/></button>
                    </Tooltip>
                </div>
                <ScheduleCard date={date}/>
            </div>
            <button>rb</button>
        </main>
    )
}