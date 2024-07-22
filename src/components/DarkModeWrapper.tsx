'use client';
import { useEffect, useState } from 'react';
// import ConstrastIcon from "@mui/icons-material/Contrast";
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import ConfigButton from "@/components/ConfigButton";

const getPreferredColorScheme = (): string => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    } else {
        return 'light';
    }
}

export default function DarkModeWrapper({children}: {children: React.ReactNode}) {
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("darkmode") === "dark");
    useEffect(() => {
        if (localStorage.getItem("darkmode") === null) {
            localStorage.setItem("darkmode", getPreferredColorScheme());

            if (getPreferredColorScheme() === "dark") {
            } else { document.documentElement.classList.add("dark"); }
            setIsDarkMode(getPreferredColorScheme() === "dark")
        } else {
            console.log(1)
            console.log(localStorage.getItem("darkmode"))

            if (localStorage.getItem("darkmode") === "dark") {
            } else { document.documentElement.classList.add("dark"); }
            setIsDarkMode(localStorage.getItem("darkmode") === "dark")
        }
    }, [isDarkMode]);
    return (
        <div>
            {children}
            <ConfigButton position="bottomright" onClick={() => {
                const newMode = !isDarkMode;
                setIsDarkMode(newMode);
                // @ts-ignore
                const target = event.target as HTMLElement;
                target.blur()
                if (document.documentElement.classList.contains("dark")) {
                    document.documentElement.classList.remove("dark");
                    localStorage.setItem("darkmode", "dark");
                } else {
                    document.documentElement.classList.add("dark");
                    localStorage.setItem("darkmode", "light");
                }
            }}>
                {/*{(() => {*/}
                {/*    const iconStyle = "size-6 text-black"*/}
                {/*    try {*/}
                {/*        if (document.documentElement.classList.contains("dark")) {*/}
                {/*            return <MoonIcon className={iconStyle} />;*/}
                {/*        } else {*/}
                {/*            return <SunIcon className={iconStyle} />;*/}
                {/*        }*/}
                {/*    } catch (error) {*/}
                {/*        // default to moonicon (server instance)*/}
                {/*        return <MoonIcon className={iconStyle} />;*/}
                {/*    }*/}
                {/*})()}*/}
                {isDarkMode ? <MoonIcon className="size-6" /> : <SunIcon className="size-6" />}
            </ConfigButton>
        </div>
    );
}