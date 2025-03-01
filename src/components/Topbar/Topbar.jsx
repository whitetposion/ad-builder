import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Pencil } from "lucide-react";
import { setFileName } from "../../state-manager/slices/preferences";
import { useSelector, useDispatch } from "react-redux";

const Topbar = ({ store }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTitleOpen, setIsTitleOpen] = useState(false);
    const [tempFileName, setTempFileName] = useState("");
    const [width, setWidth] = useState(store.width);
    const [height, setHeight] = useState(store.height);
    const fileName = useSelector((state) => state.preferences.fileName);
    const dispatch = useDispatch();
    const handleSave = () => {
        store.setSize(width, height);
        setIsOpen(false);
    };

    const handleTitleSave = () => {
        dispatch(setFileName(tempFileName));
        setIsTitleOpen(false);
    };

    return (
        <div className="flex items-center justify-between sticky w-full z-10 h-[64px] px-4" 
            style={{ background: 'linear-gradient(to left, #CCE5FF -14.26%, #7885D8 32.58%)' }}>
            
            {/* First child div - filename display */}
            <div className="flex items-center gap-2 text-white">
                <span>{fileName || "Untitled Design"}</span>
                <Pencil className="w-4 h-4 cursor-pointer" onClick={() => {
                    setTempFileName(fileName);
                    setIsTitleOpen(true);
                }} />
            </div>
            
            {/* Second child div - size display with edit button */}
            <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsOpen(true)}>
                    <span>{store.width} × {store.height}</span>
                    <Pencil className="w-4 h-4" />
                </div>
                <button
                    onClick={() => store.saveAsImage({
                        fileName: fileName,
                    })}
                    className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-white"
                >
                    Download
                </button>
            </div>

            {/* Modal for editing size */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Dialog.Panel className="bg-white p-4 rounded-lg shadow-md">
                    <Dialog.Title className="text-lg font-semibold">Edit Canvas Size</Dialog.Title>
                    <div className="flex flex-col gap-2 mt-2">
                        <input
                            type="number"
                            value={width}
                            onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                            className="px-2 py-1 rounded border"
                            placeholder="Width"
                        />
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                            className="px-2 py-1 rounded border"
                            placeholder="Height"
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button onClick={() => setIsOpen(false)} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
                        <button onClick={handleSave} className="px-3 py-1 bg-blue-500 text-white rounded">Save</button>
                    </div>
                </Dialog.Panel>
            </Dialog>

            {/* Add new Modal for editing filename */}
            <Dialog open={isTitleOpen} onClose={() => setIsTitleOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Dialog.Panel className="bg-white p-4 rounded-lg shadow-md">
                    <Dialog.Title className="text-lg font-semibold">Edit Title</Dialog.Title>
                    <div className="flex flex-col gap-2 mt-2">
                        <input
                            type="text"
                            value={tempFileName}
                            onChange={(e) => setTempFileName(e.target.value)}
                            className="px-2 py-1 rounded border"
                            placeholder="Enter title"
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button onClick={() => setIsTitleOpen(false)} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
                        <button onClick={handleTitleSave} className="px-3 py-1 bg-blue-500 text-white rounded">Save</button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
};

export default Topbar;
