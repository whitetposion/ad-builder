import { unstable_registerNextDomDrop } from "polotno/config";
import { useState } from "react";

const Attribute = ({ label, value, handleAttributeClick, store }) => {
    const [isDragging, setIsDragging] = useState(false);

    return (
        <div
            draggable={true}
            onDragStart={() => {
                setIsDragging(true);
                unstable_registerNextDomDrop((pos, element) => {
                    if (element && element.type === "text") {
                        // Update existing text element
                        element.set({ text: value });
                        return;
                    }

                    // Create new text element if not dropping onto existing text
                    store.activePage.addElement({
                        type: "text",
                        text: value,
                        width: 200,
                        x: pos.x,
                        y: pos.y,
                        fontSize: 30,
                        fill: "#000", // Text color
                        fontFamily: "Arial",
                    });
                });
            }}
            onDragEnd={() => {
                setIsDragging(false);
                unstable_registerNextDomDrop(null); // Cleanup
            }}
            className={`h-[110px] cursor-pointer w-[121px] bg-[#F2F3F5] p-3 rounded-md flex flex-col items-start justify-start transition-shadow ${isDragging ? "shadow-lg border-2 border-[#8E0DFF]" : ""
                }`}
        >
            <h2 className="text-[#8E0DFF] text-sm font-semibold mb-[10px]">{label}</h2>
            <p className="text-sm font-semibold text-[#4A4A4A] text-left whitespace-normal truncate">
                {value}
            </p>
        </div>
    );
};

export default Attribute;
