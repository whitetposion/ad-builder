import React from 'react';
import { TextSection, PhotosSection, ElementsSection, UploadSection, BackgroundSection, PagesSection, LayersSection, SizeSection, SectionTab } from 'polotno/side-panel';
import { cn } from '../../utils/cn';

import { Image as ImageIcon, Shapes, Type, CloudUpload } from 'lucide-react';
import FeedIcon from '../icons/FeedIcon';
import './side-panel.css';
import LayersIcon from '../icons/LayersIcon';
import FeedItems from '../feed-items';

const localImages = [
    {
        url: '/assets/bottle.png',
        title: 'Bottle',
    },
    {
        url: "/assets/camera.png",
        title: "Camera",
    },
    {
        url: "/assets/headphones.png",
        title: "Heaphones",
    },
    {
        url: "/assets/watch.png",
        title: "Watch",
    },
]

const CustomSection = {
    name: 'feed',  // Changed to lowercase for consistency
    Tab: (props) => (
        <div className='h-[100px] flex items-center justify-center'>
            <SectionTab name="Product Feed" {...props}>
                <div className={cn("p-1 border border-transparent", props.active && 'text-highlight border border-[#E5E5E5] rounded-lg shadow-lg')}>
                    <FeedIcon fill={props.active ? '#2F86DC' : '#4A4A4A'} />
                </div>
            </SectionTab>
        </div>
    ),
    // we need observer to update component automatically on any store changes
    Panel: ({ store }) => {
        const handleImageClick = ({ url }) => {
            if (!store.activePage) {
                // Create a new page if none exists
                store.addPage();
            }

            // Create an Image object to get the natural dimensions
            const img = new Image();
            img.onload = () => {
                const imageNaturalWidth = img.naturalWidth;
                const imageNaturalHeight = img.naturalHeight;

                // Calculate the scale factor to fit the image within the canvas
                const scaleWidth = store.width / imageNaturalWidth;
                const scaleHeight = store.height / imageNaturalHeight;

                // Use the smaller scale factor to ensure the image fits in both dimensions
                const scale = Math.min(scaleWidth, scaleHeight);

                // Calculate the displayed dimensions while preserving aspect ratio
                const displayWidth = imageNaturalWidth * scale;
                const displayHeight = imageNaturalHeight * scale;

                // Calculate position to center the image on the canvas
                const centerX = (store.width - displayWidth) / 2;
                const centerY = (store.height - displayHeight) / 2;

                // Add the image element to the active page
                store.activePage.addElement({
                    type: 'image',
                    src: url,
                    keepRatio: true,
                    x: centerX,
                    y: centerY,
                    width: displayWidth,
                    height: displayHeight,
                });
            };

            // Set the source to trigger the onload
            img.src = url;
        };

        return (
            <div className='flex flex-col items-start'>
                <p className='h-[20px]'>Images</p>
                <div className='flex flex-wrap gap-2 overflow-hidden overflow-y-auto max-h-[calc(100vh-114px)]'>
                    {localImages.map((image) => (
                        <FeedItems key={image.url} image={image} handleClick={handleImageClick} />
                    ))}
                </div>
            </div>
        );
    }
}

const CustomTextSection = {
    ...TextSection,
    name: 'text',
    Tab: (props) => {
        return (
            <div className='h-[100px] flex items-center justify-center'>
                <SectionTab name="Text" {...props} >
                    <div className={cn("p-1 border border-transparent", props.active && 'text-highlight border border-[#E5E5E5] rounded-lg shadow-lg')}>
                        <Type />
                    </div>
                </SectionTab>
            </div>
        )
    },

}
const CustomElementsSection = {
    ...ElementsSection,
    name: 'elements',
    Tab: (props) => {
        return (
            <div className='h-[100px] flex items-center justify-center'>
                <SectionTab name="Elements" {...props}>
                    <div className={cn("p-1 border border-transparent", props.active && 'text-highlight border border-[#E5E5E5] rounded-lg shadow-lg')}>
                        <Shapes className='w-full' />
                    </div>
                </SectionTab>
            </div>
        )
    }
}
const CustomImageSection = {
    ...PhotosSection,
    name: 'image',
    Tab: (props) => (
        <div className='h-[100px] flex items-center justify-center'>
            <SectionTab name="Image" {...props}>
                <div className={cn("p-1 border border-transparent", props.active && 'text-highlight border border-[#E5E5E5] rounded-lg shadow-lg')}>

                    <ImageIcon className='w-full' />
                </div>
            </SectionTab>
        </div>
    )
}
const CustomUploadSection = {
    ...UploadSection,
    name: 'upload',
    Tab: (props) => (
        <div className='h-[100px] flex items-center justify-center'>
            <SectionTab name="Upload" {...props} className="flex items-center justify-center ">
                <div className={cn("p-1 border border-transparent", props.active && 'text-highlight border border-[#E5E5E5] rounded-lg shadow-lg')}>
                    <CloudUpload className='w-full' />
                </div>
            </SectionTab>
        </div>
    )
}

const CustomLayersSection = {
    ...LayersSection,
    name: 'layers',
    Tab: (props) => (
        <div className='h-[100px] flex items-center justify-center'>
            <SectionTab name="Layers" {...props}>
                <div className={cn("p-1 border border-transparent", props.active && 'text-highlight border border-[#E5E5E5] rounded-lg shadow-lg')}>
                    <LayersIcon fill={props.active ? '#2F86DC' : '#4A4A4A'} />
                </div>
            </SectionTab>
        </div>
    )
}


export const sections = [
    CustomSection,
    CustomTextSection,
    CustomImageSection,
    CustomElementsSection,
    CustomUploadSection,
    // BackgroundSection,
    CustomLayersSection,
    // SizeSection,
]

