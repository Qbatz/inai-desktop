import React, { useState} from 'react';



import product1 from '../../Asset/Images/Cloth.png';
import product2 from '../../Asset/Images/Cloth.png';
import product3 from '../../Asset/Images/Cloth.png';
import product4 from '../../Asset/Images/Cloth.png';
import product5 from '../../Asset/Images/Cloth.png';
import product6 from '../../Asset/Images/Cloth.png';
import product7 from '../../Asset/Images/Cloth.png';







function ProductDetails() {

   

 

    const [showAll, setShowAll] = useState(false);
    const [showTechAll, setShowTechAll] = useState(false);
    const images = [product1, product2, product3, product4, product5, product6, product7];


    const handleSeeMoreProductImages = () => {
        setShowAll(true);
    };

    const handleSeeMoreTechImages = () => {
        setShowTechAll(true);
    };
    const imagesToShow = showAll ? images : images.slice(0, 6);
    const hasMoreImages = images.length > 6;


    const imagesToShowTech = showTechAll ? images : images.slice(0, 6);
    const hasMoreTechImages = images.length > 6;








    return (
        <div className="bg-blueGray-100 min-h-screen w-full">
            <div className="p-3  flex flex-col" >
                <h1 className="text-xl font-semibold mb-2 font-Gilroy text-black sticky sticky top-0 bg-blueGray-100 z-10 ">Product Detail</h1>
                          
                
                <div className="p-8 bg-white  min-h-screen rounded-2xl ">
                    <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                            <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">Product Images </p>
                            <div className="grid grid-cols-3 flex items-center justify-center gap-4">
                                {imagesToShow.map((img, index) => {
                                    const isLastVisible = !showAll && index === 5;

                                    return (
                                        <div
                                            key={index}
                                            className="relative w-[120px] h-[120px]  cursor-pointer font-Gilroy"
                                            onClick={isLastVisible ? handleSeeMoreProductImages : undefined}
                                        >
                                            <img
                                                src={img}
                                                alt={`Product ${index}`}
                                                className="w-[120px] h-[120px] object-cover rounded-md"
                                            />


                                            {isLastVisible && hasMoreImages && (
                                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                                                    <span className="text-white font-semibold text-lg">See More</span>
                                                </div>
                                            )}
                                        </div>

                                    );
                                })}
                            </div>
                        </div>


                        <div>
                            <p className="text-md font-normal mb-2 font-Gilroy text-[#4B4B4B]">Tech Images </p>
                            <div className="grid grid-cols-3 flex items-center justify-center gap-4">
                                {imagesToShowTech.map((img, index) => {
                                    const isLastVisible = !showTechAll && index === 5;

                                    return (
                                        <div
                                            key={index}
                                            className="relative  w-[120px] h-[120px] cursor-pointer font-Gilroy"
                                            onClick={isLastVisible ? handleSeeMoreTechImages : undefined}
                                        >
                                            <img
                                                src={img}
                                                alt={`Product ${index}`}
                                                className=" w-[120px] h-[120px] object-cover rounded-md"
                                            />


                                            {isLastVisible && hasMoreTechImages && (
                                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                                                    <span className="text-white font-semibold text-lg">See More</span>
                                                </div>
                                            )}
                                        </div>

                                    );
                                })}
                            </div>
                        </div>
                    </div>

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
                            <p className="text-lg font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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