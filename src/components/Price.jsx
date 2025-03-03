import { unstable_registerNextDomDrop } from "polotno/config";
import { useState } from "react";

const Price = ({ label, value, store }) => {
    const [isDragging, setIsDragging] = useState(false);

    // Format the price value
    const formattedValue = value.includes('USD') 
        ? `$${value.replace(' USD', '')}`
        : value;

    return (
        <div
            draggable={true}
            onDragStart={() => {
                setIsDragging(true);
                unstable_registerNextDomDrop((pos, element) => {
                    if (element && element.type === "text") {
                        // Update existing text element with formatted value
                        element.set({ text: formattedValue });
                        return;
                    }

                    // Create new text element with formatted value
                    store.activePage.addElement({
                        type: "text",
                        text: formattedValue,
                        width: 200,
                        x: pos.x,
                        y: pos.y,
                        fontSize: 40,
                        fill: "#000", // Text color
                        fontFamily: "Arial",
                    });
                });
            }}
            onDragEnd={() => {
                setIsDragging(false);
                unstable_registerNextDomDrop(null); // Cleanup
            }}
            className={`h-[110px] cursor-pointer w-[121px] bg-[#F2F3F5] p-3 rounded-md flex flex-col items-start justify-start transition-shadow ${
                isDragging ? "shadow-lg border-2 border-[#8E0DFF]" : ""
            }`}
        >
            <h2 className="text-[#8E0DFF] text-sm font-semibold mb-[10px]">{label}</h2>
            <p className="text-sm font-semibold text-[#4A4A4A] text-left whitespace-normal truncate">
                {formattedValue}
            </p>
        </div>
    );
};

export default Price;
