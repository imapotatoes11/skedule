'use client'
import ScheduleCard from "@/components/ScheduleCard";
import {useEffect, useState} from "react";
import {DatePicker} from '@nextui-org/date-picker';
import {Tooltip} from "@nextui-org/tooltip";
import {parseDate} from "@internationalized/date";
import {ArrowPathIcon, ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/solid";

function pushDate(currentDate: string, direction: 'forward' | 'backward'): string {
    const dateObj = new Date(currentDate);
    if (direction === 'forward') {
        dateObj.setDate(dateObj.getDate() + 1);
    } else if (direction === 'backward') {
        dateObj.setDate(dateObj.getDate() - 1);
    }
    return dateObj.toISOString().split('T')[0];
}


export default function Home() {
    // TODO: darkmode: have some divs light, dont make entirely black, bad contrast
    // * \-> same for light mode, add some black or at least dont make it entirely white

    // TODO: click schedule -> modal opens with more info

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
            className="transition-all flex h-screen flex-row justify-center align-center items-center dark:bg-neutral-950 dark:text-white bg-slate-100 text-black">
            <Tooltip content="Previous Day" closeDelay={50}>
                <button className="hover:-translate-x-1 bg-white p-3 rounded-full hover:scale-110 hover:bg-transparent mx-8 transition-all dark:text-white dark:bg-gray-700 dark:hover:bg-transparent" onClick={() => setDate(pushDate(date, 'backward'))}><ArrowLeftIcon className="cursor-pointer size-6"/></button>
            </Tooltip>
            <div className="flex flex-col items-center gap-6">
                <div className="flex flex-row items-center gap-6">
                    <DatePicker label="Choose a Date" value={parseDate((date))} onChange={(newDate) => setDate(newDate.toString())} className="min-w-[284px] shadow-md rounded-xl"/>
                    <Tooltip content="Reset Date" closeDelay={50}>
                        <button className="hover:rotate-12 bg-white p-3 rounded-full hover:scale-110 hover:bg-transparent transition-all dark:text-white dark:bg-gray-700 dark:hover:bg-transparent" onClick={() => setDate(new Date().toISOString().split("T")[0])}><ArrowPathIcon className="cursor-pointer size-6 text-black dark:text-white"/></button>
                    </Tooltip>
                </div>
                <ScheduleCard date={date}/>
            </div>
            <Tooltip content="Next Day" closeDelay={50}>
                <button className="hover:translate-x-1 bg-white p-3 rounded-full hover:scale-110 hover:bg-transparent mx-8 transition-all dark:text-white dark:bg-gray-700 dark:hover:bg-transparent" onClick={() => setDate(pushDate(date, 'forward'))}><ArrowRightIcon className="cursor-pointer size-6"/></button>
            </Tooltip>
        </main>
    )
}