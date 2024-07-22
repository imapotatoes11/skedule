'use client';

interface Period {
    start: string;
    end: string;
    name: string;
    code: string;
    room: string;
    teacher: string;
}

interface ScheduleCardProps {
    date: string; // dd-mm-yyyy
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
    return (
        <div className="transition-all p-48 rounded-lg shadow-lg dark:shadow-gray-900 bg-slate-100 dark:bg-slate-900">
            <h1 className="transition-all text-3xl text-black font-bold dark:text-white">{date}</h1>
            {periods.map((period, index) => (
                <div key={index} className="transition-all flex flex-row gap-4 items-center justify-between p-4 rounded-lg shadow-lg dark:shadow-gray-900 bg-slate-200 dark:bg-slate-800">
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