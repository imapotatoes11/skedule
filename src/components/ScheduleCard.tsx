'use client';
import { format } from 'date-fns';
import {useEffect, useState} from "react";

interface Period {
    start: string;
    end: string;
    name: string;
    code: string;
    room: string;
    teacher: string;
}

interface ScheduleCardProps {
    date: string; // yyyy-mm-dd
    periods?: Period[];
}

export default function ScheduleCard({
    date,
    periods=[{
        start: "08:00",
        end: "08:45",
        name: "Math",
        code: "MATH",
        room: "101",
        teacher: "Mr. Smith"
    },{
        start: "08:50",
        end: "09:35",
        name: "Science",
        code: "SCI",
        room: "102",
        teacher: "Ms. Johnson"
    }]
}: ScheduleCardProps) {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        // const dateObj = new Date(date); // Convert the date string to a Date object
        const [year, month, day] = date.split('-').map(part => parseInt(part, 10));
        const dateObj = new Date(Date.UTC(year, month - 1, day + 1));

        const newFormattedDate = format(dateObj, 'eeee MMMM do, yyyy'); // Format the date
        setFormattedDate(newFormattedDate);
    }, [date]);
    return (
        <div className="transition-all gap-2 p-6 flex flex-col rounded-lg shadow-lg dark:shadow-gray-900 bg-gray-50 dark:bg-slate-900">
            <h1 className="transition-all text-3xl text-black font-bold dark:text-white mb-2 mx-auto">{formattedDate}</h1>
            {periods.map((period, index) => (
                <div key={index} className="transition-all hover:scale-[102.5%] cursor-pointer flex flex-row gap-4 items-center justify-between p-4 rounded-lg shadow-md dark:shadow-gray-900 bg-white dark:bg-slate-700">
                    <div className="transition-all flex flex-col gap-2">
                        <p className="transition-all text-lg font-semibold text-black dark:text-white">{period.name}</p>
                        <p className="transition-all text-sm text-gray-500 dark:text-gray-400">{period.code}</p>
                    </div>
                    <div className="transition-all flex flex-col gap-2">
                        <p className="transition-all text-lg font-semibold text-black dark:text-white">{period.start} - {period.end}</p>
                        <p className="transition-all text-sm text-gray-500 dark:text-gray-400">{period.room}</p>
                    </div>
                    <div className="transition-all flex flex-col gap-2">
                        <p className="transition-all text-lg font-semibold text-black dark:text-white">{period.teacher}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}