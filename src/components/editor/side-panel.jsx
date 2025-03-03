import React, { useEffect, useState } from 'react';
import { TextSection, PhotosSection, ElementsSection, UploadSection, BackgroundSection, PagesSection, LayersSection, SizeSection, SectionTab, Grid } from 'polotno/side-panel';
import { cn } from '../../utils/cn';

import { Image as ImageIcon, Shapes, Type, CloudUpload } from 'lucide-react';
import FeedIcon from '../icons/FeedIcon';
import './side-panel.css';
import LayersIcon from '../icons/LayersIcon';
import FeedItems from '../feed-items';
import Attribute from '../Attribute';
import Price from '../Price';


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
        const [data, setData] = useState([]);
        const [activeImage, setActiveImage] = useState(null);

        useEffect(() => {
            fetch("/marpipe_sample_feed.json") // Fetching from public folder
                .then((response) => response.json())
                .then((json) => setData(json))
                .catch((error) => console.error("Error loading JSON:", error));
        }, []);

        const handleImageClick = (image) => {
            setActiveImage(image);
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
                    src: image.image_link,
                    keepRatio: true,
                    x: centerX,
                    y: centerY,
                    width: displayWidth,
                    height: displayHeight,
                });
            };

            // Set the source to trigger the onload
            img.src = image.image_link;
        };


        return (
            <div className='flex flex-col items-start'>
                <p className='h-[20px] text-sm font-semibold text-[#4A4A4A] text-left'>Images</p>
                <div className='h-[calc(100vh-114px)] flex flex-col gap-5'>
                    <div className='flex flex-wrap gap-2 overflow-hidden overflow-y-auto h-auto max-h-[300px]'>
                        {data.map((image) => (
                            <FeedItems key={image.image_link} image={image} handleClick={handleImageClick} />
                        ))}
                    </div>
                    {activeImage && <div className='h-auto overflow-y-auto flex flex-col gap-5'>
                        <div className='flex flex-col gap-5'>
                            <div className='text-sm font-semibold text-[#4A4A4A] text-left'>Price</div>
                            <div className='flex flex-row gap-2'>
                                <Price label="Price" value={activeImage.price} store={store} />
                                <Price label="Sale Price" value={activeImage.sale_price} store={store} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='text-sm font-semibold text-[#4A4A4A] text-left'>Main Attributes</div>
                            <div className='flex flex-row flex-wrap gap-2'>
                                <Attribute label="Brand" value={activeImage.brand} store={store} />
                                <Attribute label="Title" value={activeImage.title} store={store} />
                                <Attribute label="Description" value={activeImage.description} store={store} />
                            </div>
                        </div>

                    </div>}

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

