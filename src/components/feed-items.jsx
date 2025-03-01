const FeedItems = ({
    image,
    handleClick,
}) => {
    return (
        <div 
            className='h-[110px] w-[121px] cursor-pointer hover:opacity-80 rounded-md overflow-hidden' 
            onClick={() => handleClick(image)}
        >
            <img src={image.url} alt={image.title} className="w-full h-full object-cover" />
        </div>
    )
}

export default FeedItems;