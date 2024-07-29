'use client';
import { format } from 'date-fns';
import {useEffect, useState} from "react";
import _Modal from "@/components/Modal";
import {DocumentDuplicateIcon} from "@heroicons/react/24/outline";
import {Tooltip} from "@nextui-org/tooltip";

interface Period {
    start: string;
    end: string;
    name: string;
    code: string;
    room: string;
    teacher: string;
    description: string;
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
        teacher: "Mr. Smith",
        description: "course description here"
    },{
        start: "08:50",
        end: "09:35",
        name: "Science",
        code: "SCI",
        room: "102",
        teacher: "Ms. Johnson",
        description: "course description here"
    }]
}: ScheduleCardProps) {
    const [formattedDate, setFormattedDate] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(<></>);
    const [copy, setCopy] = useState(() => {})
    useEffect(() => {
        setCopy(() => {
            return async (text: string) => {
                await navigator.clipboard.writeText(text);
            }
        })
    }, [])

    useEffect(() => {
        // const dateObj = new Date(date); // Convert the date string to a Date object
        const [year, month, day] = date.split('-').map(part => parseInt(part, 10));
        const dateObj = new Date(Date.UTC(year, month - 1, day + 1));

        const newFormattedDate = format(dateObj, 'eeee MMMM do, yyyy'); // Format the date
        setFormattedDate(newFormattedDate);
    }, [date]);
    const getModalContent = (period: Period, date: string) => {
        return (
            <div>
                <h1 className="text-3xl">{period.name} with {period.teacher}</h1>
                <Tooltip content="Click to Copy" closeDelay={50}>
                    <p onClick={
                        // @ts-ignore
                        () => copy(period.code)
                    } className="active:text-green-500 transition-all cursor-pointer text-md text-gray-600 align-center flex flex-row w-fit">{period.code} <DocumentDuplicateIcon className="w-4 h-4 translate-y-1 translate-x-1"/></p>
                </Tooltip>
                <p className="mt-2 text-lg">On <span className="font-semibold">{date}</span>: </p>
                <p>{period.start} - {period.end} in room {period.room}</p>
                <p className="mt-3">{period.description}</p>
            </div>
        )
    }
    return (
        <div className="transition-all gap-2 p-6 flex flex-col rounded-lg shadow-lg bg-neutral-100 dark:bg-neutral-900">
            <h1 className="transition-all text-3xl text-black font-bold dark:text-white mb-2 mx-auto">{formattedDate}</h1>
            {periods.map((period, index) => (
                <div key={index} onClick={() => {setShowModal(true); setModalContent(getModalContent(period, formattedDate))}} className="active:scale-105 transition-all hover:scale-[102.5%] cursor-pointer flex flex-row gap-4 items-center justify-between p-4 rounded-lg shadow-md bg-white dark:bg-neutral-700">
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
            {showModal && (<_Modal isOpen={showModal} onOpenChange={(isOpen) => {setShowModal(isOpen)}} modalContent={modalContent} />)}
        </div>
    )
}