/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, forwardRef, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import addcircle from "../../Asset/Icon/add-circle.svg";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";
import Arrow from "../../Asset/Icon/Arrow.svg";
import FormBuilder from '../../FormBuilderComponent/AdditionalFormField';
import { InfoCircle, Gallery, Trash } from "iconsax-react";
import PropTypes from 'prop-types';
import { GET_PRODUCT_SAGA, ADD_TECH_IMAGE_PRODUCT_SAGA, ADD_IMAGE_PRODUCT_SAGA, EDIT_PRODUCT_SAGA, EDIT_TECH_IMAGE_PRODUCT_SAGA, EDIT_IMAGE_PRODUCT_SAGA, DELETE_TECH_IMAGE_PRODUCT_SAGA, DELETE_IMAGE_PRODUCT_SAGA, GET_CATEGORY_SAGA, GET_SUB_CATEGORY_SAGA, GET_BRAND_SAGA, ADD_PRODUCT_SAGA, RESET_CODE } from '../../Utils/Constant'
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import { useLocation, useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import PdfImage from '../../Asset/Images/pdf.png';
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import WordIcon from '../../Asset/Images/doc.png';


function AddProduct() {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const state = useSelector(state => state)
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const editDetails = location.state?.editDetails;
    const scrollRef = useRef(null);
    const scrollTechRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [images, setImages] = useState([
    ]);
    const [techImages, setTechImages] = useState([
    ]);



    const [initialEditData, setInitialEditData] = useState(null);
    const [showAdditionalFields, setShowAdditionalFields] = useState(false)
    const [displayItems, setDisplayItems] = useState([])
    const [formValues, setFormValues] = useState([]);
    const [errors, setErrors] = useState({});
    const [subCategoryOptions, setSubCategoryOptions] = useState()
    const [categoryOptions, setCategoryOptions] = useState();
    const [brandOptions, setBrandOptions] = useState();



    const [isChanged, setIsChanged] = useState('')
    const [serialNoList, setSerialNoList] = useState([]);
    const [inputText, setInputText] = useState("");



    const productCodeRef = useRef(null);
    const productNameRef = useRef(null);
    const descriptionRef = useRef(null);
    const currencyRef = useRef(null);
    const unitRef = useRef(null);
    const categoryRef = useRef(null);
    const brandRef = useRef(null);
    const serialNoRef = useRef(null);
    const gstRef = useRef(null);
    const subCategoryRef = useRef(null);
    const countryRef = useRef(null);
    const stateRef = useRef(null);
    const yearRef = useRef(null);













    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);






    const [formData, setFormData] = useState({
        productCode: "",
        productName: "",
        description: "",
        availableQuantity: "",
        unit: "",
        price: "",
        currency: "",
        weight: "",
        discount: "",
        hsn: "",
        gst: "",
        category: "",
        categoryName: "",
        subCategory: "",
        subCategoryName: "",
        brand: "",
        brandName: "",
        make: "",
        country: "",
        stateName: "",
        district: "",
    });


    const clearError = (field) => {
        setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors[field];
            return updatedErrors;
        });
    };


    const handleCategoryChange = (selected) => {
        clearError('category');

        setSelectedCategory(selected);
        setFormData((prev) => ({
            ...prev,
            category: selected?.value || '',
            categoryName: '',
        }));
    };

    const handleCreateCategory = (inputValue) => {
        clearError('category');
        const existingOption = categoryOptions.find(
            (option) => option.label.toLowerCase() === inputValue.toLowerCase()
        );

        if (existingOption) {
            setSelectedCategory(existingOption);
            setFormData((prev) => ({
                ...prev,
                category: existingOption.value,
                categoryName: '',
            }));
        } else {
            const tempOption = { value: inputValue, label: inputValue };
            setSelectedCategory(tempOption);
            setFormData((prev) => ({
                ...prev,
                category: '',
                categoryName: inputValue,
            }));
        }
    };



    const handleSubCategoryChange = (selected) => {
        clearError('subCategory');

        setSelectedSubCategory(selected)

        setFormData((prev) => ({
            ...prev,
            subCategory: selected?.value || '',
            subCategoryName: ""
        }));
    };

    const handleCreateSubCategory = (inputValue) => {
        clearError('subCategory');
        const existingOption = subCategoryOptions.find(
            (option) => option.label.toLowerCase() === inputValue.toLowerCase()
        );

        if (existingOption) {
            setSelectedSubCategory(existingOption);
            setFormData((prev) => ({
                ...prev,
                subCategory: existingOption.value,
                subCategoryName: ""
            }));
        } else {
            const tempOption = { value: inputValue, label: inputValue };
            setSelectedSubCategory(tempOption);
            setFormData((prev) => ({
                ...prev,
                subCategory: "",
                subCategoryName: inputValue,
            }));
        }
    };

    const handleBrandChange = (selected) => {
        clearError('brand');
        setSelectedBrand(selected)
        setFormData((prev) => ({
            ...prev,
            brand: selected?.value || '',
            brandName: ""
        }));
    };

    const handleCreateBrand = (inputValue) => {
        clearError('brand');

        const existingOption = brandOptions.find(
            (option) => option.label.toLowerCase() === inputValue.toLowerCase()
        );

        if (existingOption) {
            setSelectedBrand(existingOption);
            setFormData((prev) => ({
                ...prev,
                brand: existingOption.value,
                brandName: ""
            }));
        } else {
            const tempOption = { value: inputValue, label: inputValue };
            setSelectedBrand(tempOption);
            setFormData((prev) => ({
                ...prev,
                brand: "",
                brandName: inputValue,
            }));
        }
    };

    const handleDateChange = (date) => {
        clearError('year');
        const formatted = moment(date).format("YYYY-MM-DD");
        setSelectedDate(formatted);
    };

    const handleInputChange = (field, value) => {
        const numericFields = ["availableQuantity", "price", "weight", "discount", "gst"];
        const percentageFields = ["discount", "gst"];
        const letterFields = ["district"];
        const isNumeric = /^[0-9]*\.?[0-9]*$/;
        const isLetter = /^[a-zA-Z\s]*$/;

        if (letterFields.includes(field) && value !== "" && !isLetter.test(value)) {
            return;
        }
        if (numericFields.includes(field) && value !== "" && !isNumeric.test(value)) {
            return;
        }
        if (percentageFields.includes(field) && parseFloat(value) > 100) {
            return;
        }
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: value?.trim() ? "" : prevErrors[field],
        }));
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.productCode) newErrors.productCode = "Product Code is required";
        if (!formData.productName.trim()) newErrors.productName = "Product Name is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.currency.trim()) newErrors.currency = "Currency is required";
        if (!formData.unit) newErrors.unit = "Unit is required";
        if (!formData.gst) newErrors.gst = "GST is required";

        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.stateName) newErrors.stateName = "State is required";
        if (!selectedDate) newErrors.year = "Year is required";

        const isCategoryValid = (!!formData.category && !formData.categoryName) ||
            (!formData.category && !!formData.categoryName);
        if (!isCategoryValid) {
            newErrors.category = "Category is required";
        }




        const isSubCategoryValid = (!!formData.subCategory && !formData.subCategoryName) ||
            (!formData.subCategory && !!formData.subCategoryName);
        if (!isSubCategoryValid) {
            newErrors.subCategory = "Sub category is required";
        }
        const isBrandValid = (!!formData.brand && !formData.brandName) ||
            (!formData.brand && !!formData.brandName);
        if (!isBrandValid) {
            newErrors.brand = "Brand is required";
        }

        const quantity = parseInt(formData.availableQuantity);
        if (quantity || quantity <= 0) {
            if (serialNoList.length !== quantity) {
                newErrors.serialNo = `Please enter ${quantity} serial number(s)`;
            }
        }

        if (images.length === 0) {
            newErrors.images = "At least one product image is required";
        }

        if (techImages.length === 0) {
            newErrors.techImages = "At least one technical image is required";
        }

        setErrors(newErrors);

        requestAnimationFrame(() => {
            if (newErrors.productCode) productCodeRef.current?.focus();
            else if (newErrors.productName) productNameRef.current?.focus();
            else if (newErrors.description) descriptionRef.current?.focus();
            else if (newErrors.images) document.getElementById("imageUploadSection")?.scrollIntoView({ behavior: "smooth" });
            else if (newErrors.techImages) document.getElementById("techImageUploadSection")?.scrollIntoView({ behavior: "smooth" });
            else if (newErrors.unit) unitRef.current?.focus();
            else if (newErrors.currency) currencyRef.current?.focus();
            else if (newErrors.gst) gstRef.current?.focus();
            else if (newErrors.serialNo) serialNoRef.current?.focus();
            else if (newErrors.category) categoryRef.current?.focus();
            else if (newErrors.subCategory) subCategoryRef.current?.focus();
            else if (newErrors.brand) brandRef.current?.focus();
            else if (newErrors.country) countryRef.current?.focus();
            else if (newErrors.year) yearRef.current?.focus();
            else if (newErrors.stateName) stateRef.current?.focus();
        });

        return Object.keys(newErrors).length === 0;
    };






    const handleSerialInputChange = (e) => {
        clearError('serialNo');
        const input = e.target.value;
        setInputText(input);

        let newErrors = {};

        const serials = input
            .split(",")
            .map((s) => s.trim().toUpperCase())
            .filter((s) => s !== "");

        const allowedCount = parseInt(formData.availableQuantity);
        const hasDuplicates = new Set(serials).size !== serials.length;

        if (hasDuplicates) {
            newErrors.serialNo = "Please enter unique serial numbers only";
        } else if (serials.length > allowedCount) {
            newErrors.serialNo = `Only ${allowedCount} serial number(s) allowed`;
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setSerialNoList(serials);
        } else {
            const limitedSerials = serials.slice(0, allowedCount);
            setSerialNoList(limitedSerials);
            setInputText(limitedSerials.join(", "));
        }
    };





    const handleImageAdd = async (e) => {
        clearError("images")
        const files = Array.from(e.target.files);
        let imageError = {};

        const processedImages = await Promise.all(
            files.map(async (file) => {
                try {
                    const fileSizeInMB = file.size / (1024 * 1024);


                    if (fileSizeInMB > 50) {
                        const options = {
                            maxSizeMB: 50,
                            useWebWorker: true,
                        };
                        const compressedBlob = await imageCompression(file, options);

                        const compressedFile = new File([compressedBlob], file.name, {
                            type: compressedBlob.type,
                            lastModified: Date.now(),
                        });

                        return compressedFile;
                    } else {

                        return file;
                    }
                } catch (error) {
                    console.error(`Processing failed for ${file.name}:`, error);
                    return null;
                }
            })
        );

        const filteredProcessed = processedImages.filter((img) => img !== null);

        setImages((prev) => {
            const unique = filteredProcessed.filter(
                (img) => !prev.some((p) => p.name === img.name && p.size === img.size)
            );

            const imagesWithPreview = unique.map((img) => ({
                file: img,
                previewUrl: URL.createObjectURL(img),
            }));

            const totalImages = prev.length + imagesWithPreview.length;

            if (totalImages > 10) {
                imageError.imageErrors = "You can only upload up to 10 images";
                setErrors(imageError);
                const allowedCount = 10 - prev.length;
                return [...prev, ...imagesWithPreview.slice(0, allowedCount)];
            } else {

                return [...prev, ...imagesWithPreview];
            }
        });
    };




    const handleClose = () => {
        navigate('/product')
    }


    const handleImageAddEditMode = async (e) => {
        const files = Array.from(e.target.files);
        const maxSizeMB = 1;
        const compressedImages = [];
        const skippedTooLarge = [];
        const uniqueFiles = files.filter(file => !images.includes(file));
        const totalImages = images.length + uniqueFiles.length;

        if (totalImages > 10) {
            setErrors({ imageErrors: "You can only upload up to 10 images" });
            return;
        }

        setLoading(true);
        setErrors({});

        for (const file of uniqueFiles) {
            if (file.size / (1024 * 1024) > maxSizeMB) {
                try {
                    const options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                    };
                    const compressedFile = await imageCompression(file, options);
                    compressedImages.push(compressedFile);
                } catch (err) {
                    console.error("Compression failed:", err);
                    skippedTooLarge.push(file.name);
                }
            } else {
                compressedImages.push(file);
            }
        }

        setImages(prev => [...prev, ...compressedImages]);

        dispatch({
            type: ADD_IMAGE_PRODUCT_SAGA,
            payload: {
                productCode: formData.productCode,
                image: compressedImages,
            }
        });

        if (skippedTooLarge.length) {
            setErrors({
                imageErrors: `Some files couldn't be compressed: ${skippedTooLarge.join(", ")}`
            });
        }

    };









    const handleTechDocAdd = async (e) => {
        clearError("techImages")
        const files = Array.from(e.target.files);
        let imageError = {};

        const processedFiles = await Promise.all(
            files.map(async (file) => {
                if (file.type.startsWith("image/")) {
                    try {
                        const options = {
                            maxSizeMB: 1,
                            maxWidthOrHeight: 1024,
                            useWebWorker: true,
                        };
                        const compressedBlob = await imageCompression(file, options);

                        const compressedFile = new File([compressedBlob], file.name, {
                            type: compressedBlob.type,
                            lastModified: Date.now(),
                        });

                        return compressedFile;
                    } catch (error) {
                        console.error(`Compression failed for ${file.name}:`, error);
                        return null;
                    }
                } else {
                    return file;
                }
            })
        );

        const filteredCompressed = processedFiles.filter((file) => file !== null);

        setTechImages((prev) => {
            const unique = filteredCompressed.filter(
                (file) => !prev.some((p) => p.name === file.name && p.size === file.size)
            );

            const uniqueWithPreview = unique.map((file) => ({
                file,
                previewUrl: URL.createObjectURL(file),
                name: file.name,
                type: file.type,
            }));

            const totalFiles = prev.length + uniqueWithPreview.length;

            if (totalFiles > 10) {
                imageError.techImagesError = "You can only upload up to 10 Technical documents";
                setErrors(imageError);

                const allowedCount = 10 - prev.length;
                return [...prev, ...uniqueWithPreview.slice(0, allowedCount)];
            } else {
                return [...prev, ...uniqueWithPreview];
            }
        });
    };


    const handleTechDocAddImageinEditMode = async (e) => {
        const files = Array.from(e.target.files);
        const maxSizeMB = 1;
        const maxFiles = 10;

        const unique = files.filter(file => {
            return !techImages.some(existing => existing.name === file.name && existing.size === file.size);
        });

        const totalImages = techImages.length + unique.length;
        const imageError = {};
        const compressedFiles = [];
        const failedFiles = [];

        if (totalImages > maxFiles) {
            imageError.techImagesError = `You can only upload up to ${maxFiles} Technical files`;
            setErrors(imageError);

            const allowedCount = maxFiles - techImages.length;
            const validFiles = unique.slice(0, allowedCount);
            setTechImages(prev => [...prev, ...validFiles]);
            return;
        }

        setLoading(true);
        setErrors({});

        for (const file of unique) {
            const isImage = file.type.startsWith("image/");

            if (isImage && file.size / (1024 * 1024) > maxSizeMB) {
                try {
                    const options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                    };

                    const compressed = await imageCompression(file, options);
                    const compressedFile = new File([compressed], file.name, {
                        type: compressed.type,
                        lastModified: Date.now(),
                    });

                    compressedFiles.push(compressedFile);
                } catch (err) {
                    console.error("Compression failed for", file.name, err);
                    failedFiles.push(file.name);
                }
            } else {
                compressedFiles.push(file);
            }
        }

        setTechImages(prev => [...prev, ...compressedFiles]);

        if (compressedFiles.length) {
            dispatch({
                type: ADD_TECH_IMAGE_PRODUCT_SAGA,
                payload: {
                    productCode: formData.productCode,
                    technicaldoc: compressedFiles,
                },
            });
        }

        if (failedFiles.length) {
            setErrors({
                techImagesError: `Some files couldn't be compressed: ${failedFiles.join(", ")}`,
            });
        }

        setLoading(false);
    };






    const handleChangeImage = (index) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.doc,.docx,.txt,image/*';


        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                let compressedFile = file;

                if (file.type.startsWith("image/")) {
                    try {
                        const options = {
                            maxSizeMB: 1,
                            maxWidthOrHeight: 1024,
                            useWebWorker: true,
                        };
                        const compressedBlob = await imageCompression(file, options);
                        compressedFile = new File([compressedBlob], file.name, {
                            type: compressedBlob.type,
                            lastModified: Date.now(),
                        });
                    } catch (error) {
                        console.error(`Compression failed for ${file.name}:`, error);
                    }
                }

                const newPreviewUrl = URL.createObjectURL(compressedFile);

                setTechImages((prev) => {
                    const updated = [...prev];


                    if (updated[index]?.previewUrl) {
                        URL.revokeObjectURL(updated[index].previewUrl);
                    }

                    updated[index] = {
                        ...updated[index],
                        url: compressedFile,
                        previewUrl: newPreviewUrl,
                        name: compressedFile.name,
                    };

                    return updated;
                });
            }
        };

        input.click();
    };








    const handleImageDeleteLocally = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };







    const handleTechImageDeleteLocally = (index) => {
        const updatedImages = techImages.filter((_, i) => i !== index);
        setTechImages(updatedImages);
    }



    const handleEditTechChangeImage = (index, id) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*,application/pdf';

        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                let finalFile = file;
                setLoading(true);

                if (file.type.startsWith("image/") && file.size / (1024 * 1024) > 1) {
                    try {
                        const options = {
                            maxSizeMB: 1,
                            maxWidthOrHeight: 1920,
                            useWebWorker: true,
                        };
                        finalFile = await imageCompression(file, options);
                    } catch (err) {
                        console.error("Compression failed for tech doc image:", file.name, err);
                    }
                }

                setTechImages((prev) => {
                    const updated = [...prev];
                    updated[index] = finalFile;

                    if (formData?.productCode) {
                        dispatch({
                            type: EDIT_TECH_IMAGE_PRODUCT_SAGA,
                            payload: {
                                id: id,
                                file: finalFile,
                                productCode: formData.productCode,
                            }
                        });
                    }

                    return updated;
                });
            }
        };

        input.click();
    };


    const handleEditChangeImage = (index, id) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                let finalImage = file;
                setLoading(true);


                if (file.size / (1024 * 1024) > 1) {
                    try {
                        const options = {
                            maxSizeMB: 1,
                            maxWidthOrHeight: 1920,
                            useWebWorker: true,
                        };
                        finalImage = await imageCompression(file, options);
                    } catch (err) {
                        console.error("Compression failed for product image:", file.name, err);
                    }
                }


                setImages((prev) => {
                    const updated = [...prev];
                    updated[index] = {
                        original: file,
                        compressed: finalImage,
                    };


                    if (formData?.productCode) {
                        dispatch({
                            type: EDIT_IMAGE_PRODUCT_SAGA,
                            payload: {
                                id: id,
                                image: finalImage,
                                productCode: formData.productCode,
                            }
                        });
                    }

                    return updated;
                });
            }
        };

        input.click();
    };




    const handleImageDelete = (imageId) => {
        if (imageId) {
            dispatch({ type: DELETE_IMAGE_PRODUCT_SAGA, payload: { id: imageId } })
            setLoading(true)
        }
    };

    const handleTechImageDelete = (imageId) => {
        if (imageId) {
            dispatch({ type: DELETE_TECH_IMAGE_PRODUCT_SAGA, payload: { id: imageId } })
            setLoading(true)
        }
    }




    const handleScrollToLeftPhotos = () => {
        scrollRef.current?.scrollBy({ left: -500, behavior: 'smooth' });
    };

    const handleScrollToRightPhotos = () => {
        scrollRef.current?.scrollBy({ left: 500, behavior: 'smooth' });
    };



    const handleScrollToLeftPhotosForTech = () => {
        scrollTechRef.current?.scrollBy({ left: -500, behavior: 'smooth' });
    }

    const handleScrollToRightPhotosForTech = () => {
        scrollTechRef.current?.scrollBy({ left: 500, behavior: 'smooth' });
    }


    const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
        <div
            className="flex w-full font-Gilroy items-center border border-gray-300 rounded-md px-3 py-2.5 text-md text-gray-700 cursor-pointer"
            onClick={onClick}
            ref={ref}
        >
            <input
                type="text"
                className="flex-1 font-Gilroy bg-transparent outline-none py-0.5 font-medium text-sm text-slate-500 placeholder-gray-400"
                value={value}
                placeholder={placeholder}
                readOnly
            />
            <CalendarDays className="text-gray-400 ml-2 shrink-0" size={18} />
        </div>
    ));

    CustomInput.displayName = "CustomInput";



    const PrevArrow = () => {
        return (
            <div
                className="cursor-pointer"
                onClick={handleScrollToLeftPhotos}
            >
                <img src={Arrow} className="w-7 h-7 rotate-180" alt="prev" />
            </div>
        );
    };
    const NextArrow = () => {
        return (
            <div
                className="cursor-pointer"
                onClick={handleScrollToRightPhotos}
            >
                <img src={Arrow} className="w-7 h-7" alt="next" />
            </div>
        );
    };




    const PrevArrowTech = () => {
        return (
            <div
                className="cursor-pointer"
                onClick={handleScrollToLeftPhotosForTech}
            >
                <img src={Arrow} className="w-7 h-7 rotate-180" alt="prev" />
            </div>
        );
    };
    const NextArrowTech = () => {
        return (
            <div
                className="cursor-pointer"
                onClick={handleScrollToRightPhotosForTech}
            >
                <img src={Arrow} className="w-7 h-7" alt="next" />
            </div>
        );
    };





    const updateShowAdditionalFields = () => {
        setShowAdditionalFields(true)
    }

    const updateDisplayItems = (item) => {
        setDisplayItems([...displayItems, item])
        setFormValues(prev => [...prev, item]);
        setShowAdditionalFields(false)
    }

    const handleCloseForm = () => {
        setShowAdditionalFields(false)
    }








    const updateFormValues = (title, newValue, type) => {
        const updatedItems = displayItems.map((item) => {
            if (item.title === title) {
                return {
                    ...item,
                    value: newValue,
                    type: type || item.type
                };
            }
            return item;
        });
        setDisplayItems(updatedItems);
        setFormValues(updatedItems)
    };






    const RadioOptionsChange = (title, newValue) => {
        updateFormValues(title, newValue, "radio");
    };

    const CheckboxOptionsChange = (title, selectedOption) => {
        const field = displayItems.find((item) => item.title === title);

        let currentValues = Array.isArray(field.value) ? [...field.value] : [];

        if (currentValues.includes(selectedOption)) {
            currentValues = currentValues.filter((val) => val !== selectedOption);
        } else {
            currentValues.push(selectedOption);
        }
        updateFormValues(title, currentValues, "checkbox");
    };


    const SelectOptionsChange = (title, newValue) => {
        updateFormValues(title, newValue, "select");
    };

    const textInputCallbackForName = (title, newValue) => {
        updateFormValues(title, newValue, "text");
    };

    const CallbackForTextArea = (title, newValue) => {
        updateFormValues(title, newValue, "textarea");
    };





    const deepEqual = (obj1, obj2) => {
        if (obj1 === obj2) return true;
        if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
            return false;
        }

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) return false;

        for (let key of keys1) {
            if (!keys2.includes(key)) return false;
            if (!deepEqual(obj1[key], obj2[key])) return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const AddPayload = {
                productCode: formData.productCode,
                productName: formData.productName,
                description: formData.description,
                unit: formData.unit,
                price: formData.price,
                quantity: formData.availableQuantity,
                currency: formData.currency,
                weight: formData.weight,
                discount: formData.discount,
                hsnCode: formData.hsn,
                gst: formData.gst,
                category: formData.category,
                categoryName: formData.categoryName,
                subCategory: formData.subCategory,
                subCategoryName: formData.subCategoryName,
                make: formData.make,
                countryOfOrigin: formData.country,
                manufaturingYearAndMonth: selectedDate,
                State: formData.stateName,
                district: formData.district,
                brand: formData.brand,
                brandName: formData.brandName,
                images: images,
                technicaldocs: techImages,
                serialNo: serialNoList,
                additional_fields: formValues ? formValues : []
            };

            const EditPayload = {
                productCode: formData.productCode,
                productName: formData.productName,
                description: formData.description,
                unit: formData.unit,
                price: formData.price,
                quantity: Number(formData.availableQuantity),
                currency: formData.currency,
                weight: formData.weight,
                discount: formData.discount,
                hsnCode: formData.hsn,
                gst: formData.gst,
                category: formData.category,
                categoryName: formData.categoryName,
                subCategory: formData.subCategory,
                subCategoryName: formData.subCategoryName,
                make: formData.make,
                countryOfOrigin: formData.country,
                manufaturingYearAndMonth: selectedDate,
                State: formData.stateName,
                district: formData.district,
                brand: formData.brand,
                brandName: formData.brandName,
                images: images,
                technicaldocs: techImages,
                serialNo: serialNoList,
                additional_fields: formValues ? formValues : []
            };

            if (editDetails) {
                const normalizeData = (data) => {
                    return Object.keys(data).reduce((acc, key) => {
                        acc[key] = data[key] === undefined ? null : data[key];
                        return acc;
                    }, {});
                };

                const currentData = normalizeData({
                    ...EditPayload,
                    manufaturingYearAndMonth: selectedDate?.toISOString?.() || null,
                });

                const initialData = normalizeData({
                    ...initialEditData,
                    manufaturingYearAndMonth: initialEditData.manufaturingYearAndMonth?.toISOString?.() || null,
                });

                const isEqual = deepEqual(currentData, initialData);



                if (isEqual) {
                    setIsChanged("No changes detected");
                    return;
                }
            }

            if (editDetails) {
                dispatch({ type: EDIT_PRODUCT_SAGA, payload: EditPayload });
                setLoading(true);
            } else {
                dispatch({ type: ADD_PRODUCT_SAGA, payload: AddPayload });
                setLoading(true);
            }
        }
    };


    useEffect(() => {
        let optionArray = [];
        state?.product?.categoryList?.forEach((category) => {
            optionArray.push({
                label: category.name,
                value: category.id
            });
        });
        setCategoryOptions(optionArray);
    }, [state?.product?.categoryList]);

    useEffect(() => {
        let optionArray = [];
        state?.product?.subCategoryList?.forEach((subcategory) => {
            optionArray.push({
                label: subcategory.name,
                value: subcategory.id
            });
        });
        setSubCategoryOptions(optionArray);
    }, [state?.product?.subCategoryList]);

    useEffect(() => {
        let optionArray = [];
        state?.product?.brandList?.forEach((brand) => {
            optionArray.push({
                label: brand.name,
                value: brand.id
            });
        });
        setBrandOptions(optionArray);
    }, [state?.product?.brandList]);









    useEffect(() => {
        dispatch({ type: GET_CATEGORY_SAGA })
        dispatch({ type: GET_BRAND_SAGA })

    }, [])



    useEffect(() => {
        if (formData.category && !isNaN(formData.category)) {
            dispatch({
                type: GET_SUB_CATEGORY_SAGA,
                payload: { catId: Number(formData.category) },
            });
        }
    }, [formData.category]);


    useEffect(() => {
        if (state.Common?.successCode === 200 || state.Common?.code === 400 || state.Common?.code === 401 || state.Common?.code === 402 || state.Common?.code === 413) {


            dispatch({ type: GET_PRODUCT_SAGA, payload: { searchKeyword: "" } });
            setTimeout(() => {
                dispatch({ type: RESET_CODE })
            }, 5000)

            setLoading(false)

        }
    }, [state.Common?.successCode, state.Common?.code]);



    useEffect(() => {
        if (editDetails) {
            let serialNoValue = [];

            if (Array.isArray(editDetails.serialNo)) {
                serialNoValue = editDetails.serialNo;
            } else {
                try {
                    const parsed = JSON.parse(editDetails.serialNo);
                    serialNoValue = Array.isArray(parsed) ? parsed : [];
                } catch (e) {
                    serialNoValue = [];
                }
            }



            const filteredImages = state.product.productList.filter(img => img.productCode === editDetails.productCode);

            const initialForm = {
                productCode: editDetails.productCode || "",
                productName: editDetails.productName || "",
                description: editDetails.description || "",
                availableQuantity: editDetails.quantity || 0,
                unit: editDetails.unit || "",
                price: editDetails.price || "",
                currency: editDetails.currency || "",
                weight: editDetails.weight || "",
                discount: editDetails.discount || "",
                hsn: editDetails.hsnCode || "",
                gst: editDetails.gst || "",
                category: editDetails.categoryId || "",
                subCategory: editDetails.subCategoryId || "",
                brand: editDetails.brandId || "",
                make: editDetails.make || "",
                country: editDetails.countryOfOrigin || "",
                stateName: editDetails.State || "",
                district: editDetails.district || "",
            };

            setFormData(initialForm);

            setInitialEditData({
                productCode: initialForm.productCode,
                productName: initialForm.productName,
                description: initialForm.description,
                unit: initialForm.unit,
                price: initialForm.price,
                quantity: Number(initialForm.availableQuantity),
                currency: initialForm.currency,
                weight: initialForm.weight,
                discount: initialForm.discount,
                hsnCode: initialForm.hsn,
                gst: initialForm.gst,
                category: initialForm.category,
                subCategory: initialForm.subCategory,
                make: initialForm.make,
                countryOfOrigin: initialForm.country,
                manufaturingYearAndMonth: moment(editDetails.manufaturingYearAndMonth).isValid()
                    ? moment(editDetails.manufaturingYearAndMonth)
                    : null,
                State: initialForm.stateName,
                district: initialForm.district,
                brand: initialForm.brand,
                images: filteredImages[0]?.images || [],
                technicaldocs: filteredImages[0]?.technicaldocs || [],
                serialNo: serialNoValue,
                additional_fields: editDetails.additional_fields || [],
            });


            setImages(filteredImages[0]?.images || []);
            setTechImages(filteredImages[0]?.technicaldocs || []);
            const manufacturingMoment = moment(editDetails.manufaturingYearAndMonth);
            setSelectedDate(manufacturingMoment.isValid() ? manufacturingMoment : null);
            setSerialNoList(serialNoValue);
            setInputText(serialNoValue);

            if (editDetails.additional_fields && Array.isArray(editDetails.additional_fields)) {
                const additionalFields = editDetails.additional_fields.map((field = {}) => ({
                    title: field.title || "",
                    value: field.value ?? "",
                    type: field.type || "text",
                    name: field.title || "",
                    options: Array.isArray(field.options) ? field.options : [],
                    placeholder: field.placeholder || ""
                }));

                setDisplayItems(additionalFields);
                setFormValues(additionalFields);
            }
        }
    }, [editDetails, state.product.productList]);











    useEffect(() => {
        if (state.Common.IsVisible === 1) {
            navigate('/product')
        }

    }, [state.Common.IsVisible])

 





    useEffect(() => {
        return () => {
            images.forEach(img => {
                if (typeof img !== 'string' && img instanceof File) {
                    URL.revokeObjectURL(URL.createObjectURL(img));
                }
            });
        };
    }, [images]);



    useEffect(() => {
        return () => {
            techImages.forEach(img => {
                if (img instanceof File || img.url instanceof File) {
                    URL.revokeObjectURL(img instanceof File ? img : img.url);
                }
            });
        };
    }, [techImages]);



    useEffect(() => {
        if (displayItems.length > 0) {
            const initialFormValues = displayItems.map((field) => ({
                title: field.title,
                value: field.value || "",
                type: field.type,
                options: field.options || [],
                placeholder: field.placeholder || ""
            }));
            setFormValues(initialFormValues);
        }
    }, [displayItems]);

    const stateOptions = [
        { value: '', label: 'Enter State', isDisabled: true },
        { value: 'tamil-nadu', label: 'Tamil Nadu' },
        { value: 'maharashtra', label: 'Maharashtra' },
        { value: 'karnataka', label: 'Karnataka' },
        { value: 'delhi', label: 'Delhi' },
        { value: 'kerala', label: 'Kerala' },
        { value: 'gujarat', label: 'Gujarat' },
        { value: 'rajasthan', label: 'Rajasthan' },
        { value: 'west-bengal', label: 'West Bengal' },
        { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
        { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
        { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
        { value: 'bihar', label: 'Bihar' },
        { value: 'assam', label: 'Assam' },
        { value: 'odisha', label: 'Odisha' },
        { value: 'punjab', label: 'Punjab' }
    ];
    const currencyOptions = [
        { value: '', label: 'Select beneficiary currency', isDisabled: true },
        { value: 'USD', label: 'USD' },
        { value: 'INR', label: 'INR' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'JPY', label: 'JPY' }
    ];
    const countryOptions = [
        { value: 'india', label: 'India' },
        { value: 'usa', label: 'United States' },
        { value: 'china', label: 'China' },
        { value: 'germany', label: 'Germany' },
        { value: 'japan', label: 'Japan' },
        { value: 'uk', label: 'United Kingdom' },
    ];
    const unitOptions = [
        { value: '', label: 'Select Unit of measurement', isDisabled: true },
        { value: 'kg', label: 'Kilogram (kg)' },
        { value: 'g', label: 'Gram (g)' },
        { value: 'l', label: 'Litre (l)' },
        { value: 'ml', label: 'Millilitre (ml)' },
        { value: 'pcs', label: 'Pieces (pcs)' }
    ];

    const selectCustomStyles = {
        control: (provided) => ({
            ...provided,
            borderColor: '#D1D5DB',
            borderRadius: '0.375rem',
            boxShadow: 'none',
            minHeight: '48px',
            fontSize: '14px',
            fontFamily: 'Gilroy',
            padding: '6px 1px',
            '&:hover': {
                borderColor: '#9ca3af',
            },
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        indicatorsContainer: (base) => ({
            ...base,
            cursor: 'pointer',
            fontFamily: 'Gilroy',
        }),
        dropdownIndicator: (base) => ({
            ...base,
            cursor: 'pointer',
            fontFamily: 'Gilroy',
            color: '#94A3B8',
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '0.375rem',
            marginTop: '0.25rem',
            zIndex: 10,
            fontFamily: 'Gilroy',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#205DA8' : 'white',
            color: state.isFocused ? '#ffffff' : '#000000',
            padding: '2px 10px',
            cursor: 'pointer',
            fontFamily: 'Gilroy',
            marginBottom: '4px',
            '&:active': {
                backgroundColor: '#2563eb',
            },


        }),

        placeholder: (provided) => ({
            ...provided,
            color: "#64748B",
            fontWeight: '500',
            fontFamily: 'Gilroy',
        }),
        menuList: (provided) => ({
            ...provided,
            maxHeight: '150px',
            fontWeight: 400,
            padding: 0,
            overflowY: 'auto',
            fontFamily: 'Gilroy',
            fontSize: '15px',
            scrollbarWidth: 'thin',
            scrollbarColor: '#6b7280 #ffffff',
            '::-webkit-scrollbar': {
                width: '10px',
            },
            '::-webkit-scrollbar-track': {
                background: '#ffffff',
                borderRadius: '0.375rem',
            },
            '::-webkit-scrollbar-thumb': {
                background: '#6b7280',
                borderRadius: '0.375rem',
                border: '2px solid #ffffff',
                cursor: 'pointer',
            },
            '::-webkit-scrollbar-thumb:hover': {
                background: '#4b5563',
            },
            '::-webkit-scrollbar-button': {
                background: '#ffffff',
                height: '12px',
                display: 'block',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '8px',
                backgroundPosition: 'center',
            },
            '::-webkit-scrollbar-button:decrement': {
                backgroundImage:
                    'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiAxNSA5IDE4IDE4IDkiLz48L3N2Zz4=")',
            },
            '::-webkit-scrollbar-button:increment': {
                backgroundImage:
                    'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBsdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDkgNiAxOCA5Ii8+PC9zdmc+")',
            },
        }),
    };

    const customSelectStyles = {
        control: (base) => ({
            ...base,
            borderColor: '#D1D5DB',
            borderRadius: '0.5rem',
            boxShadow: 'none',
            cursor: 'pointer',
            padding: '6px 1px',
            minHeight: '44px',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#205DA8' : 'white',
            color: state.isFocused ? 'white' : 'black',
            fontWeight: 500,
            padding: '4px 10px',
            cursor: 'pointer'
        }),
        menu: (base) => ({
            ...base,
            maxHeight: '120px',
            overflowY: 'auto',

            scrollbarWidth: 'thin',
            msOverflowStyle: 'auto',
        }),
        singleValue: (base) => ({
            ...base,
            color: '#64748B',
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: '#94A3B8',
            padding: '0 8px',
        }),
    };


    return (
        <div className="bg-gray-100 p-6 min-h-screen flex w-full justify-center relative">

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                    <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
                </div>
            )}



            <div className="bg-white p-6 rounded-lg shadow-lg w-full h-auto">
                <h2 className="text-xl font-semibold mb-4 font-Gilroy">{editDetails ? 'Edit Product' : 'Add Product'}</h2>

                {
                    isChanged && <label className="block  mb-2 text-start font-Gilroy font-normal text-md text-red-600"> {isChanged} </label>
                }

                {
                    state.Common?.errorMessage && <label className="block  mb-2 text-start font-Gilroy font-normal text-md text-red-600"> {state.Common.errorMessage} </label>
                }

                <div className="flex-1 mx-auto  max-w-7xl  max-h-[450px] overflow-y-auto lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3">

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-2 items-start">
                        <div className="col-span-5 md:col-span-2 w-full flex flex-col h-full">
                            <div>
                                <label className="block font-normal text-md font-Outfit mb-1">
                                    Product Code (Unique) <span className="text-red-500 text-lg">*</span>
                                </label>
                                <input
                                    type="text"
                                    ref={productCodeRef}
                                    className={`mb-1 focus:outline-none w-full border border-gray-300 rounded-lg px-3 py-3 font-medium text-sm  font-Gilroy  ${formData.productCode ? "text-slate" : "text-slate-500"}`}
                                    placeholder="Enter Product code"
                                    name="productCode"
                                    value={formData.productCode}
                                    onChange={(e) => handleInputChange('productCode', e.target.value)}
                                />
                                {errors.productCode && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                        <InfoCircle size={16} color="#DC2626" />
                                        {errors.productCode}
                                    </p>
                                )}

                            </div>


                            <div>
                                <label className="block font-normal text-md font-Outfit mb-1">
                                    Product Name <span className="text-red-500 text-lg">*</span>
                                </label>
                                <input
                                    type="text"
                                    ref={productNameRef}
                                    className={`mb-1 focus:outline-none w-full border border-gray-300 rounded-lg px-3 py-3 font-medium text-sm ${formData.productN ? "text-slate" : "text-slate-500"} font-Gilroy`}
                                    placeholder="Enter Product Name"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={(e) => handleInputChange('productName', e.target.value)}
                                />
                                {errors.productName && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                        <InfoCircle size={16} color="#DC2626" />
                                        {errors.productName}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block font-normal text-md font-Outfit mb-1">
                                    Description<span className="text-red-500 text-lg">*</span>
                                </label>

                                <textarea
                                    ref={descriptionRef}
                                    placeholder="Enter Description"
                                    className={`mt-1 focus:outline-none w-full p-4 border rounded-lg h-36 font-medium text-sm ${formData.description ? "text-slate" : "text-slate-500"} font-Gilroy`}
                                    name="description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                        <InfoCircle size={16} color="#DC2626" />
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </div>



                        <div className="col-span-5 md:col-span-3 w-full flex flex-col h-full">
                            <label className="block font-normal text-md font-Outfit ps-2"> {editDetails ? "Edit Photos" : "Add Photos"}</label>



                            <div className="flex mt-2 gap-0 relative z-10">



                                {
                                    images.length > 3 && <div className="absolute left-[0px] top-1/2 -translate-y-1/2 z-20 ">
                                        <PrevArrow />

                                    </div>
                                }


                                <div ref={scrollRef} className="flex flex-row items-center max-w-[500px] ml-[10px] overflow-x-scroll">
                                    {images?.length > 0 && (
                                        <div className="bg-white flex flex-row">
                                            {images.map((imgObj, index) => {
                                                let imageSrc = "";

                                                if (typeof imgObj === "string") {
                                                    imageSrc = imgObj;
                                                } else if (imgObj?.previewUrl) {
                                                    imageSrc = imgObj.previewUrl;
                                                } else if (imgObj?.url) {
                                                    imageSrc = imgObj.url;
                                                }


                                                return (
                                                    <div key={index} className="px-1">
                                                        <div className="relative w-32 h-32 rounded-md overflow-hidden  border border-zinc-300 group" >

                                                            <img
                                                                src={imageSrc}
                                                                alt={`uploaded-${index}`}
                                                                className={` cursor-pointer w-full h-full ${imgObj.type === 'image/svg+xml' ? '' : 'object-cover'}`}
                                                            />
                                                            <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black bg-opacity-50 transition duration-300 ">

                                                                <div className="flex items-center  space-x-2">

                                                                    {
                                                                        editDetails && images?.length > 0 ?
                                                                            <>

                                                                                <div
                                                                                    className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white bg-opacity-50 cursor-pointer"
                                                                                    onClick={() => handleEditChangeImage(index, imgObj.id)}
                                                                                >
                                                                                    <Gallery
                                                                                        size="16"
                                                                                        color="#FFF"
                                                                                        variant="Bold"
                                                                                        style={{ cursor: "pointer" }}
                                                                                    />
                                                                                </div>


                                                                                <div className="w-px h-6 bg-white opacity-60" />
                                                                                <div
                                                                                    className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white bg-opacity-50 cursor-pointer"
                                                                                    onClick={() => handleImageDelete(imgObj.id)}
                                                                                >
                                                                                    <Trash
                                                                                        size="16"
                                                                                        color="#FFF"
                                                                                        variant="Bold"
                                                                                        style={{ cursor: "pointer" }}
                                                                                    />
                                                                                </div>
                                                                            </>


                                                                            :
                                                                            (
                                                                                <>
                                                                                    <div
                                                                                        className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white bg-opacity-50 cursor-pointer"
                                                                                        onClick={() => handleChangeImage(index)}
                                                                                    >
                                                                                        <Gallery
                                                                                            size="16"
                                                                                            color="#FFF"
                                                                                            variant="Bold"
                                                                                            style={{ cursor: "pointer" }}
                                                                                        />
                                                                                    </div>

                                                                                    <div
                                                                                        className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white bg-opacity-50 cursor-pointer"
                                                                                        onClick={() => handleImageDeleteLocally(index)}
                                                                                    >
                                                                                        <Trash
                                                                                            size="16"
                                                                                            color="#FFF"
                                                                                            variant="Bold"
                                                                                            style={{ cursor: "pointer" }}
                                                                                        />
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                    }
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}





                                </div>


                                <div className="min-w-32 min-h-32 border-dashed border flex items-center justify-center rounded-md cursor-pointer bg-white">
                                    {
                                        editDetails ?

                                            <label id="imageUploadSection" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                                <img src={addcircle} alt="addcircle" className="w-6 h-6 mb-1" />
                                                <span className="font-Gilroy font-semibold text-xs text-blue-700 text-center font-Outfit">Add Image</span>
                                                <span className="font-Gilroy font-medium text-xs text-[#4B4B4B] text-center">Max size 10 MB</span>
                                                <input
                                                    type="file"
                                                    name="image"
                                                    accept="image/*"
                                                    className="hidden"
                                                    disabled={images.length > 10}
                                                    onChange={handleImageAddEditMode}
                                                />
                                            </label>
                                            :
                                            <div className='relative'>
                                                {
                                                    images.length > 3 && <div className='absolute left-[-40px] top-1/2 -translate-y-1/2 z-20'>
                                                        <NextArrow />

                                                    </div>
                                                }
                                                <label id="imageUploadSection" className="w-full h-full flex flex-col items-center justify-center cursor-pointer ">



                                                    <img src={addcircle} alt="addcircle" className="w-6 h-6 mb-1" />
                                                    <span className="font-Gilroy font-semibold text-xs text-blue-700 text-center font-Outfit">Add Image</span>
                                                    <span className="font-Gilroy font-medium text-xs text-[#4B4B4B] text-center">Max size 10 MB</span>
                                                    <input
                                                        type="file"
                                                        name="image"
                                                        accept="image/*"
                                                        className="hidden"
                                                        disabled={images.length > 10}
                                                        onChange={handleImageAdd}
                                                    />
                                                </label>
                                            </div>
                                    }

                                </div>

                            </div>


                            {errors.imageErrors && (
                                <p className="text-red-500 text-xs flex items-center gap-1 mt-2 mb-2 font-Gilroy ">
                                    <InfoCircle size={16} color="#DC2626" />
                                    {errors.imageErrors}
                                </p>

                            )}
                            {errors.images && (
                                <p className="text-red-500 text-xs flex items-center gap-1  font-Gilroy mt-2 mb-2">
                                    <InfoCircle size={16} color="#DC2626" />
                                    {errors.images}
                                </p>

                            )}



                            <label className="block font-normal text-md font-Outfit mt-2 ps-2">Technical</label>




                            <div className="flex mt-2 gap-0 relative z-10">

                                {
                                    techImages.length > 3 && <div className="absolute left-[0px] top-1/2 -translate-y-1/2 z-20 ">
                                        <PrevArrowTech />

                                    </div>
                                }


                                <div ref={scrollTechRef} className=' flex flex-row   items-center max-w-[500px] ml-[10px] overflow-x-scroll'>
                                    {techImages?.length > 0 && (
                                        <div className="bg-white flex flex-row">
                                            {techImages.map((img, index) => {


                                                let imageSrc = "";
                                                let isImage = false;
                                                let isPdf = false;


                                                let isDoc = false;
                                                if (typeof img.url === "string") {
                                                    imageSrc = img.url;
                                                    isImage = img.url.match(/\.(jpeg|jpg|png|gif)$/i);
                                                    isPdf = img.url.endsWith(".pdf");
                                                    isDoc = img.url.match(/\.(doc|docx|txt)$/i);
                                                } else if (img.file instanceof File) {
                                                    imageSrc = img.previewUrl;
                                                    isImage = img.type.startsWith("image/");
                                                    isPdf = img.type === "application/pdf";
                                                    isDoc =
                                                        img.type === "application/msword" ||
                                                        img.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                                                        img.type === "text/plain";
                                                }


                                                return (
                                                    <div key={index} className="px-1">
                                                        <div className="relative w-32 h-32 rounded-md overflow-hidden group border border-zinc-300">
                                                            {isImage ? (
                                                                <img
                                                                    src={imageSrc}
                                                                    alt={`uploaded-${index}`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : isPdf ? (
                                                                <div className="flex flex-col items-center justify-center text-center px-2">
                                                                    <img src={PdfImage} alt="PDF" className="w-full h-full object-cover" />
                                                                    <p className="text-xs text-zinc-700 truncate w-full">{img.name}</p>
                                                                </div>
                                                            )
                                                                : isDoc ? (
                                                                    <div className="flex flex-col items-center justify-center text-center px-2 w-full h-full bg-zinc-100">
                                                                        <img src={WordIcon} alt="DOC File" className="w-12 h-12 object-contain" />
                                                                        <p className="text-xs text-zinc-700 truncate mt-1 w-full text-center">{img.name}</p>
                                                                    </div>
                                                                ) : null}

                                                            <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black bg-opacity-50 transition duration-300 ">

                                                                <div className="flex  items-center space-x-2">


                                                                    {
                                                                        editDetails && techImages?.length > 0 ? <>

                                                                            <div
                                                                                className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white bg-opacity-50 cursor-pointer"
                                                                                onClick={() => handleEditTechChangeImage(index, img.id)}
                                                                            >
                                                                                <Gallery
                                                                                    size="16"
                                                                                    color="#FFF"
                                                                                    variant="Bold"
                                                                                    style={{ cursor: "pointer" }}
                                                                                />
                                                                            </div>


                                                                            <div className="w-px h-6 bg-white opacity-60" />
                                                                            <div
                                                                                className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white bg-opacity-50 cursor-pointer"
                                                                                onClick={() => handleTechImageDelete(img.id)}
                                                                            >
                                                                                <Trash
                                                                                    size="16"
                                                                                    color="#FFF"
                                                                                    variant="Bold"
                                                                                    style={{ cursor: "pointer" }}
                                                                                />
                                                                            </div>
                                                                        </>
                                                                            :
                                                                            <>

                                                                                <div
                                                                                    className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white bg-opacity-50 cursor-pointer"
                                                                                    onClick={() => handleChangeImage(index)}
                                                                                >
                                                                                    <Gallery
                                                                                        size="16"
                                                                                        color="#FFF"
                                                                                        variant="Bold"
                                                                                        style={{ cursor: "pointer" }}
                                                                                    />
                                                                                </div>


                                                                                <div
                                                                                    className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white bg-opacity-50 cursor-pointer"
                                                                                    onClick={() => handleTechImageDeleteLocally(index)}
                                                                                >
                                                                                    <Trash
                                                                                        size="16"
                                                                                        color="#FFF"
                                                                                        variant="Bold"
                                                                                        style={{ cursor: "pointer" }}
                                                                                    />
                                                                                </div>


                                                                            </>



                                                                    }
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )



                                    }



                                </div>


                                {
                                    editDetails ?

                                        <label id="techImageUploadSection" className="w-32 h-32 border-dashed border flex flex-col items-center justify-center rounded-md cursor-pointer">
                                            <img src={addcircle} alt="addcircle" className="w-6 h-6 mb-1" />
                                            <span className="font-Gilroy font-semibold text-xs text-blue-700 text-center font-Outfit">
                                                Add Documents
                                            </span>
                                            <span className="font-Gilroy font-medium text-xs text-[#4B4B4B] text-center">
                                                Max size 10 MB
                                            </span>
                                            <input
                                                type="file"
                                                name="tech"
                                                accept=".pdf,.doc,.docx,.txt,image/*"
                                                className="hidden"
                                                disabled={techImages.length > 10}
                                                onChange={handleTechDocAddImageinEditMode}
                                            />
                                        </label>

                                        :

                                        <div className='relative'>
                                            {
                                                techImages.length > 3 && <div className='absolute left-[-18px] top-1/2 -translate-y-1/2 z-20'>
                                                    <NextArrowTech />

                                                </div>
                                            }

                                            <label id="techImageUploadSection" className="min-w-32 min-h-32 border-dashed border flex flex-col items-center justify-center rounded-md cursor-pointer">
                                                <img src={addcircle} alt="addcircle" className="w-6 h-6 mb-1" />
                                                <span className="font-Gilroy font-semibold text-xs text-blue-700 text-center font-Outfit">
                                                    Add Documents
                                                </span>
                                                <span className="font-Gilroy font-medium text-xs text-[#4B4B4B] text-center">
                                                    Max size 10 MB
                                                </span>
                                                <input
                                                    type="file"
                                                    name="tech"
                                                    accept=".pdf,.doc,.docx,.txt,image/*"
                                                    className="hidden"
                                                    disabled={techImages.length > 10}
                                                    onChange={handleTechDocAdd}
                                                />
                                            </label>
                                        </div>
                                }
                            </div>
                            {errors.techImagesError && (
                                <p className="text-red-500 text-xs flex items-center gap-1  font-Gilroy mt-2 mb-2">
                                    <InfoCircle size={16} color="#DC2626" />
                                    {errors.techImagesError}
                                </p>

                            )}
                            {errors.techImages && (
                                <p className="text-red-500 text-xs flex items-center gap-1 mt-2 mb-2 font-Gilroy">
                                    <InfoCircle size={16} color="#DC2626" />
                                    {errors.techImages}
                                </p>

                            )}
                        </div>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2 ">

                        <div >
                            <label className="block font-normal text-md font-Outfit mb-1.5">
                                Available Quantity
                            </label>
                            <input
                                type="text"
                                value={formData.availableQuantity}
                                onChange={(e) => handleInputChange('availableQuantity', e.target.value)}
                                className="w-full focus:outline-none border border-gray-300 rounded-lg px-3 py-3 font-medium text-sm text-slate-500 font-Gilroy"
                                placeholder="Enter Available Quantity"
                            />
                        </div>
                        <div>
                            <label className="block font-normal text-md font-Outfit mb-1.5">Unit of measurement <span className="text-red-500 text-sm">*</span></label>
                            <div className="relative">
                                <Select
                                    ref={unitRef}
                                    value={unitOptions.find(option => option.value === formData.unit)}
                                    onChange={(selectedOption) => handleInputChange('unit', selectedOption?.value)}
                                    options={unitOptions}
                                    styles={customSelectStyles}
                                    className="capitalize font-Gilroy font-medium text-sm text-neutral-600"
                                    isSearchable={false}
                                    placeholder="Select Unit of measurement"
                                />
                            </div>

                            {errors.unit && (
                                <p className="text-red-500 text-xs flex items-center gap-1 mt-2  font-Gilroy">
                                    <InfoCircle size={16} color="#DC2626" />
                                    {errors.unit}
                                </p>
                            )}
                        </div>
                        <div >
                            <label className="block font-normal text-md font-Outfit mb-1">Price</label>
                            <input
                                type="text"
                                value={formData.price}
                                onChange={(e) => handleInputChange('price', e.target.value)}
                                className="w-full focus:outline-none border border-gray-300 rounded-lg px-3 py-3 font-medium text-sm text-slate-500 font-Gilroy"
                                placeholder="Enter Price"
                            />
                        </div>




                        <div>
                            <label className="block font-normal text-md font-Outfit mb-1 flex items-center gap-1">
                                Currency
                                <span className="text-red-500 text-sm">*</span>
                            </label>
                            <div className='relative'>
                                <Select
                                    ref={currencyRef}
                                    value={currencyOptions.find(option => option.value === formData.currency)}
                                    onChange={(selectedOption) => handleInputChange('currency', selectedOption?.value)}
                                    options={currencyOptions}
                                    styles={customSelectStyles}
                                    className="capitalize font-Gilroy font-medium text-sm text-neutral-600"
                                    placeholder="Select beneficiary currency"
                                />
                            </div>

                            {errors.currency && (
                                <p className="text-red-500 mt-2 text-xs flex items-center gap-1 font-Gilroy">
                                    <InfoCircle size={16} color="#DC2626" />
                                    {errors.currency}
                                </p>
                            )}
                        </div>

                        <div >
                            <label className="block font-normal text-md font-Outfit mb-1">Weight</label>


                            <input
                                type="text"
                                value={formData.weight}
                                onChange={(e) => handleInputChange('weight', e.target.value)}
                                placeholder="Enter Weight"
                                className="w-full border focus:outline-none border-gray-300 rounded-lg px-3 py-3 font-medium text-sm text-slate-500 font-Gilroy"
                            />



                        </div>

                        <div >
                            <label className="block font-normal text-md font-Outfit mb-1">Discount</label>
                            <div className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden">
                                <div className="px-3 py-2 border-r text-slate-400 text-sm">%</div>
                                <input
                                    type="text"
                                    value={formData.discount}
                                    onChange={(e) => handleInputChange('discount', e.target.value)}
                                    placeholder="Enter Discount"
                                    className="w-full focus:outline-none px-3 py-3 font-medium text-sm text-slate-400 focus:outline-none font-Gilroy"
                                />
                            </div>
                        </div>



                        <div >
                            <label className="block font-normal text-sm font-Outfit mb-1.5">
                                HSN
                            </label>
                            <input
                                type="text"
                                value={formData.hsn}
                                onChange={(e) => handleInputChange('hsn', e.target.value)}
                                className="w-full border focus:outline-none border-gray-300 rounded-lg px-3 py-3 font-medium text-sm text-slate-500 font-Gilroy"
                                placeholder="Enter hsn"
                            />
                        </div>
                        <div >
                            <label className="block font-normal text-md font-Outfit mb-1">Gst <span className="text-red-500 text-sm">*</span></label>
                            <div className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden">
                                <div className="px-3 py-2 border-r text-slate-400 text-sm">%</div>
                                <input
                                    type="text"
                                    ref={gstRef}
                                    value={formData.gst}
                                    onChange={(e) => handleInputChange('gst', e.target.value)}
                                    placeholder="Enter GST"
                                    className="w-full focus:outline-none px-3 py-3 font-medium text-sm text-slate-400 focus:outline-none font-Gilroy"
                                />




                            </div>
                            {errors.gst && (
                                <p className="text-red-500 text-xs flex items-center gap-1 mt-2 font-Gilroy">
                                    <InfoCircle size={16} color="#DC2626" />
                                    {errors.gst}
                                </p>
                            )}
                        </div>
                        <div >
                            <label className="block font-normal text-md font-Outfit mb-1">Serial No</label>
                            <input
                                type="text"
                                ref={serialNoRef}
                                value={inputText}
                                onChange={handleSerialInputChange}
                                disabled={!formData.availableQuantity}
                                placeholder="Enter Serial No"
                                className="w-full focus:outline-none border border-gray-300 rounded-lg px-3 py-3 font-medium text-sm text-slate-500 font-Gilroy"
                            />
                            {errors.serialNo && (
                                <p className="text-red-500 mt-2 mb-2 text-xs flex items-center gap-1 font-Gilroy">
                                    <InfoCircle size={16} color="#DC2626" />
                                    {errors.serialNo}
                                </p>
                            )}

                        </div>




                        <div className="">
                            <label className="block font-normal text-md font-Outfit mb-1.5">
                                Category <span className="text-red-500 text-sm">*</span>
                            </label>
                            <div className="relative max-h-40 cursor-pointer">
                                <CreatableSelect
                                    ref={categoryRef}
                                    options={categoryOptions}
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    onCreateOption={handleCreateCategory}
                                    placeholder="Select Category"
                                    className="w-full cursor-pointer"
                                    classNamePrefix="react-select"
                                    styles={selectCustomStyles}

                                />
                            </div>

                            {errors.category && (
                                <p className="text-red-500 text-xs flex items-center gap-1 mt-2 font-Gilroy">
                                    <InfoCircle size={16} color="#DC2626" />
                                    {errors.category}
                                </p>
                            )}
                        </div>



                        <div className="">
                            <label className="block font-normal text-md font-Outfit mb-1.5">
                                Sub Category  <span className="text-red-500 text-sm">*</span>
                            </label>

                            <CreatableSelect
                                ref={subCategoryRef}
                                options={subCategoryOptions}
                                value={selectedSubCategory}
                                onChange={handleSubCategoryChange}
                                onCreateOption={handleCreateSubCategory}
                                placeholder="Select Sub Category"
                                className="w-full"
                                classNamePrefix="react-select"
                                styles={selectCustomStyles}
                            />

                            {errors.subCategory && (
                                <p className="text-red-500 text-xs flex items-center gap-1 mt-2 font-Gilroy">
                                    <InfoCircle size={16} color="#DC2626" />
                                    {errors.subCategory}
                                </p>
                            )}
                        </div>

                        <div className="">
                            <label className="block font-normal text-md font-Outfit mb-1.5">
                                Brand <span className="text-red-500 text-sm">*</span>
                            </label>
                            <div className="relative">
                                <CreatableSelect
                                    ref={brandRef}
                                    options={brandOptions}
                                    value={selectedBrand}
                                    onChange={handleBrandChange}
                                    onCreateOption={handleCreateBrand}
                                    placeholder="Select Brand"
                                    className="w-full"
                                    classNamePrefix="react-select"
                                    styles={selectCustomStyles}
                                />


                            </div>
                            {errors.brand && (
                                <p className="text-red-500 text-xs flex items-center gap-1 mt-2 font-Gilroy">
                                    <InfoCircle size={16} color="#DC2626" />
                                    {errors.brand}
                                </p>
                            )}
                        </div>







                        <div>
                            <label className="block font-normal text-md font-Outfit mb-1">Country of Origin <span className="text-red-500 text-sm">*</span></label>
                            <div className="relative">
                                <Select
                                    options={countryOptions}
                                    ref={countryRef}
                                    value={countryOptions.find(option => option.value === formData.country)}
                                    onChange={(selectedOption) => handleInputChange('country', selectedOption.value)}
                                    className="font-Gilroy text-sm"
                                    classNamePrefix="react-select"
                                    placeholder="Enter Country of Origin"
                                    styles={customSelectStyles}
                                />
                            </div>
                            {errors.country && (
                                <p className="text-red-500 text-xs flex items-center gap-1 mt-2 font-Gilroy">
                                    <InfoCircle size={16} color="#DC2626" />
                                    {errors.country}
                                </p>
                            )}
                        </div>

                        <div >
                            <label className="block text-md font-Outfit font-medium text-[#1F2937] mb-1">
                                Month and Year of Manufacture <span className="text-red-500 text-sm">*</span>
                            </label>
                            <div className=' w-full '>


                                <DatePicker
                                    ref={yearRef}
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className='cursor-pointer font-Gilroy font-medium text-sm text-slate-400 w-full'
                                    placeholderText="Month and Year of Manufacture"
                                    customInput={<CustomInput />}
                                    wrapperClassName="w-full"
                                />
                            </div>
                            {errors.year && (
                                <p className="text-red-500 text-xs flex items-center gap-1 mt-2 font-Gilroy">
                                    <InfoCircle size={16} color="#DC2626" />
                                    {errors.year}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block font-normal text-md font-Outfit mb-1">State <span className="text-red-500 text-sm">*</span></label>
                            <div className="relative">

                                <Select
                                    ref={stateRef}
                                    options={stateOptions}
                                    value={stateOptions.find(option => option.value === formData.stateName)}
                                    onChange={(selectedOption) => handleInputChange('stateName', selectedOption.value)}
                                    className="font-Gilroy text-sm"
                                    classNamePrefix="react-select"
                                    styles={customSelectStyles}
                                />
                            </div>
                            {errors.stateName && (
                                <p className="text-red-500 text-xs flex items-center gap-1 mt-2 font-Gilroy">
                                    <InfoCircle size={16} color="#DC2626" />
                                    {errors.stateName}
                                </p>
                            )}
                        </div>


                        <div >
                            <label className="block font-normal text-md font-Outfit mb-1">
                                District
                            </label>
                            <input
                                type="text"
                                value={formData.district}
                                onChange={(e) => handleInputChange('district', e.target.value)}
                                className="w-full border focus:outline-none border-gray-300 rounded-lg px-3 py-3 font-medium text-sm text-slate-500 font-Gilroy"
                                placeholder="Enter District"
                            />
                        </div>




                    </div>






                    <div className="flex flex-wrap -mx-2 mb-3">
                        {displayItems.length > 0 &&
                            displayItems.map((field, index) => (
                                <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4 max-w-[100%]">
                                    {field.type === "text" && (
                                        <div>
                                            <label className="block font-normal text-md font-Outfit mb-1.5 capitalize">
                                                {field.title}
                                            </label>
                                            <input
                                                type="text"
                                                value={formValues?.find((item) => item.title === field.title)?.value || ""}
                                                placeholder={field.placeholder}
                                                onChange={(e) =>
                                                    textInputCallbackForName(field.title, e.target.value)
                                                }
                                                className="w-full focus:outline-none border border-gray-300 rounded-lg font-medium text-sm text-slate-400 py-3 px-3 font-Gilroy"
                                            />
                                        </div>
                                    )}


                                    {field.type === "radio" && (
                                        <div>
                                            <label className="block font-normal text-md font-Outfit mb-1.5 capitalize">
                                                {field.title}
                                            </label>
                                            <div className="flex flex-wrap gap-4">
                                                {field.options?.map((option, idx) => (
                                                    <label key={idx} className="inline-flex items-center space-x-2 text-md text-gray-600 font-Outfit">
                                                        <input
                                                            type="radio"
                                                            id={`radio-${index}-${idx}`}
                                                            name={field.name}
                                                            value={option}
                                                            checked={field.value === option}
                                                            onChange={() => RadioOptionsChange(field.title, option)}
                                                            className="w-3 focus:outline-none h-3 text-blue-600 border-gray-300 focus:ring-blue-500 font-Gilroy text-sm"
                                                        />
                                                        <span>{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {field.type === "checkbox" && (
                                        <div>
                                            <label className="block text-md font-Outfit mb-1.5 capitalize text-black">
                                                {field.title}
                                            </label>
                                            <div className="flex flex-wrap gap-4">
                                                {field.options?.map((option, idx) => (
                                                    <label
                                                        key={idx}
                                                        className="flex items-center w-[calc(33.333%-0.5rem)] space-x-2 text-sm text-gray-600 font-Outfit"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            name={field.name}
                                                            value={option}
                                                            checked={field.value?.includes(option)}
                                                            onChange={() => CheckboxOptionsChange(field.title, option)}
                                                            className="w-3 h-3 focus:outline-none text-blue-600 border-gray-300 rounded focus:ring-blue-500 font-Gilroy text-sm"
                                                        />
                                                        <span>{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {field.type === "select" && (
                                        <div>
                                            <label className="block font-normal text-md font-Outfit mb-1.5 capitalize text-black">
                                                {field.title}
                                            </label>
                                            <div className="relative">
                                                <select
                                                    className="cursor-pointer w-full border  focus:outline-none border-gray-300 rounded-lg px-3 py-[10px] text-sm font-Gilroy font-medium text-gray-700 appearance-none"
                                                    value={formValues?.find((item) => item.title === field.title)?.value || ""}
                                                    onChange={(e) => SelectOptionsChange(field.title, e.target.value)}
                                                >
                                                    <option value="" disabled>
                                                        Select {field.title}
                                                    </option>
                                                    {field.options?.map((option, idx) => (
                                                        <option key={idx} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                                <svg
                                                    className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}

                                    {field.type === "textarea" && (
                                        <div>
                                            <label className="block font-normal  text-sm font-Outfit mb-1.5 capitalize text-black font-Outfit">
                                                {field.title}
                                            </label>
                                            <textarea
                                                className="w-full border focus:outline-none border-gray-300 rounded-lg px-3 py-[10px] text-sm  font-Gilroy font-medium text-gray-700 resize-none h-28"
                                                placeholder={field.placeholder}
                                                value={field.value}
                                                onChange={(e) => CallbackForTextArea(field.title, e.target.value)}
                                            />
                                        </div>
                                    )}

                                </div>
                            ))}
                    </div>




                    <div> {
                        showAdditionalFields && <FormBuilder update={updateDisplayItems} handleClose={handleCloseForm} />}

                    </div>

                    <button className='bg-[#205DA8] px-10 py-2 rounded-lg text-base font-medium text-white flex items-center mt-3 font-Montserrat' onClick={updateShowAdditionalFields} >+ Additional Field</button>

                    <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
                        <button onClick={handleClose} className=" w-[167px] bg-white border border-rose-600 text-rose-600 font-medium py-2 px-10 rounded-lg font-Montserrat">
                            Cancel
                        </button>
                        <button onClick={handleSubmit} className=" w-[167px] bg-[#205DA8] text-white font-medium py-2 px-10 rounded-lg font-Montserrat">
                            Submit
                        </button>
                    </div>

                </div>





            </div>
        </div>
    );
}
AddProduct.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
    placeholder: PropTypes.string,
};
export default AddProduct;