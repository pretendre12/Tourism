import {  useEffect } from "react";

const NotFoundPage = () => {
    useEffect(() => {
        const randomNum = () => Math.floor(Math.random() * 9) + 1;
        let count1 = 0, count2 = 0, count3 = 0;
        const time = 30;

        const selector3 = document.querySelector('.thirdDigit') as HTMLSpanElement | null;
        const selector2 = document.querySelector('.secondDigit') as HTMLSpanElement | null;
        const selector1 = document.querySelector('.firstDigit') as HTMLSpanElement | null;

        if (!selector3 || !selector2 || !selector1) return;

        const loop3 = setInterval(() => {
            if (count3 > 40) {
                clearInterval(loop3);
                selector3.textContent = "4";
            } else {
                selector3.textContent = randomNum().toString();
                count3++;
            }
        }, time);

        const loop2 = setInterval(() => {
            if (count2 > 80) {
                clearInterval(loop2);
                selector2.textContent = "0";
            } else {
                selector2.textContent = randomNum().toString();
                count2++;
            }
        }, time);

        const loop1 = setInterval(() => {
            if (count1 > 100) {
                clearInterval(loop1);
                selector1.textContent = "4";
            } else {
                selector1.textContent = randomNum().toString();
                count1++;
            }
        }, time);

        // Cleanup intervals
        return () => {
            clearInterval(loop3);
            clearInterval(loop2);
            clearInterval(loop1);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <div className="relative flex gap-2">
                <div className="relative transform skew-x-[-15deg] bg-white shadow-lg p-6 rounded-lg">
                    <span className="thirdDigit text-6xl font-bold text-white bg-blue-500 px-6 py-4 rounded-full shadow-lg"></span>
                </div>
                <div className="relative transform skew-x-[-15deg] bg-white shadow-lg p-6 rounded-lg">
                    <span className="secondDigit text-6xl font-bold text-white bg-blue-500 px-6 py-4 rounded-full shadow-lg"></span>
                </div>
                <div className="relative transform skew-x-[-15deg] bg-white shadow-lg p-6 rounded-lg">
                    <span className="firstDigit text-6xl font-bold text-white bg-blue-500 px-6 py-4 rounded-full shadow-lg"></span>
                </div>
            </div>
            <div className="relative mt-4 px-4 py-2 bg-gray-800 text-white rounded-full text-lg font-semibold italic shadow-md">
                OH!
            </div>
            <h2 className="mt-4 text-gray-600 text-2xl font-semibold">Sorry! Page not found</h2>
        </div>
    );
};

export default NotFoundPage;