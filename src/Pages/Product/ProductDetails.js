import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VIEW_VENDOR_SAGA } from '../../Utils/Constant'
import { useParams } from 'react-router-dom';







function ProductDetails() {

    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const { productId } = useParams()

    console.log("productId", productId)

    const [showAll, setShowAll] = useState(false);

    const handleSeeMore = () => {
        setShowAll(true);
    };

    // const imagesToShow = showAll ? images : images.slice(0, 6);
    // const hasMoreImages = images.length > 6;










    return (
        <div className="bg-blueGray-100 min-h-screen w-full">
            <div className="p-3">
                <h1 className="text-xl font-semibold mb-2 font-Gilroy text-black">Product Detail</h1>
                <div className="p-6 bg-white  min-h-screen rounded-2xl  ps-5 pt-3 pe-5  min-h-fit">


                    {/* <div className="grid grid-cols-3 gap-4">
                        {imagesToShow.map((img, index) => {
                            const isLastVisible = !showAll && index === 5;

                            return (
                                <div
                                    key={index}
                                    className="relative w-full h-full cursor-pointer"
                                    onClick={isLastVisible ? handleSeeMore : undefined}
                                >
                                    <img
                                        src={img}
                                        alt={`Product ${index}`}
                                        className="w-full h-auto object-cover rounded-md"
                                    />


                                    {isLastVisible && hasMoreImages && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                                            <span className="text-white font-semibold text-lg">See More</span>
                                        </div>
                                    )}
                                </div>

                            );
                        })}
                    </div> */}


                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-12 p-2 ">

                        <div>
                            <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">Product Code </p>
                            <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">sdhvhsv</p>
                        </div>
                        <div>
                            <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">Product Name</p>
                            <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">skjvhsjkvsdjk</p>
                        </div>


                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-12 p-2 ">

                        <div>
                            <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">Description </p>
                            <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">sdhvhsv</p>
                        </div>



                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-12 p-2 ">

<div>
    <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">Available Quantity </p>
    <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">sdhvhsv</p>
</div>
<div>
    <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">Unit of Measurement </p>
    <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">sdhvhsv</p>
</div>
<div>
    <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">Price </p>
    <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">sdhvhsv</p>
</div>

<div>
    <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">Currency </p>
    <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">sdhvhsv</p>
</div>

<div>
    <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">Weight </p>
    <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">sdhvhsv</p>
</div>

<div>
    <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">Discount </p>
    <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">sdhvhsv</p>
</div>

<div>
    <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">HSN </p>
    <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">sdhvhsv</p>
</div>
<div>
    <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">GST </p>
    <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">sdhvhsv</p>
</div>
<div>
    <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">Serial No</p>
    <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">sdhvhsv</p>
</div>

<div>
    <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">Category</p>
    <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">sdhvhsv</p>
</div>

<div>
    <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">Sub - Category</p>
    <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">sdhvhsv</p>
</div>

<div>
    <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">Brand</p>
    <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">sdhvhsv</p>
</div>

<div>
    <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">Country of Origin</p>
    <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">sdhvhsv</p>
</div>
<div>
    <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">Month and Year of Manufacture</p>
    <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">sdhvhsv</p>
</div>
<div>
    <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">State</p>
    <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">sdhvhsv</p>
</div>


</div>








                </div>
            </div>
        </div>
    )
}

export default ProductDetails