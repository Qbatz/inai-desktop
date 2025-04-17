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




    const [isChanged, setIsChanged] = useState('')
    const [serialNoList, setSerialNoList] = useState([]);
    const [inputText, setInputText] = useState("");




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
        subCategory: "",
        brand: "",
        make: "",
        country: "",
        stateName: "",
        district: "",
    });


    const [errors, setErrors] = useState({});



    const handleDateChange = (date) => {
        const formatted = moment(date).format("YYYY-MM-DD");
        setSelectedDate(formatted);
    };







    const handleInputChange = (field, value) => {

        const numericFields = ["availableQuantity", "price", "weight", "discount", "gst"];
        const percentageFields = ["discount", "gst"];
        const isNumeric = /^[0-9]*\.?[0-9]*$/;

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
            [field]: value.trim() ? "" : prevErrors[field],
        }));
    };







    const validate = () => {
        let newErrors = {};

        if (!formData.productCode) newErrors.productCode = "Product Code is required";
        if (!formData.productName.trim()) newErrors.productName = "Product Name is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.currency.trim()) newErrors.currency = "Currency is required";
        if (!formData.unit) newErrors.unit = "Unit is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.brand) newErrors.brand = "Brand is required";
        const quantity = parseInt(formData.availableQuantity);
        if (quantity || quantity <= 0) {
            if (serialNoList.length !== quantity) {
                newErrors.serialNo = `Please enter ${quantity} serial number(s)`;
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSerialInputChange = (e) => {
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
        const files = Array.from(e.target.files);
        let imageError = {};

        const compressedImages = await Promise.all(
            files.map(async (file) => {
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
            })
        );

        const filteredCompressed = compressedImages.filter((img) => img !== null);

        setImages((prev) => {
            const unique = filteredCompressed.filter(
                (img) => !prev.some((p) => p.name === img.name && p.size === img.size)
            );
            const totalImages = prev.length + unique.length;

            if (totalImages > 10) {
                imageError.imageErrors = "You can only upload up to 10 images";
                setErrors(imageError);
                const allowedCount = 10 - prev.length;
                return [...prev, ...unique.slice(0, allowedCount)];
            } else {
                setErrors({});
                return [...prev, ...unique];
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
        const files = Array.from(e.target.files);
        let imageError = {};
    
        const compressedImages = await Promise.all(
            files.map(async (file) => {
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
            })
        );
    
        const filteredCompressed = compressedImages.filter((img) => img !== null);
    
        setTechImages((prev) => {
            const unique = filteredCompressed.filter(
                (img) => !prev.some((p) => p.name === img.name && p.size === img.size)
            );
            const totalImages = prev.length + unique.length;
    
            if (totalImages > 10) {
                imageError.techImagesError = "You can only upload up to 10 Technical images";
                setErrors(imageError);
                const allowedCount = 10 - prev.length;
                return [...prev, ...unique.slice(0, allowedCount)];
            } else {
                setErrors({});
                return [...prev, ...unique];
            }
        });
    };


    const handleTechDocAddImageinEditMode = async (e) => {
        const files = Array.from(e.target.files);
        const unique = files.filter(preview => !techImages.includes(preview));
        const totalImages = techImages.length + unique.length;
        const maxSizeMB = 1;
        const compressedFiles = [];
        const failedFiles = [];

        let imageError = {};

        if (totalImages > 10) {
            imageError.techImagesError = "You can only upload up to 10 Technical images";
            setErrors(imageError);

            const allowedCount = 10 - techImages.length;
            const validFiles = unique.slice(0, allowedCount);
            setTechImages(prev => [...prev, ...validFiles]);
            return;
        }

        setLoading(true);
        setErrors({});

        for (const file of unique) {
            if (file.size / (1024 * 1024) > maxSizeMB) {
                try {
                    const options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                    };
                    const compressed = await imageCompression(file, options);
                    compressedFiles.push(compressed);
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
                }
            });
        }

        if (failedFiles.length) {
            setErrors({
                techImagesError: `Some files couldn't be compressed: ${failedFiles.join(", ")}`
            });
        }


    };



    const handleChangeImage = (index) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setImages((prev) => {
                    const updated = [...prev];
                    updated[index] = file;
                    return updated;
                });
            }
        };

        input.click();
    };


    const handleEditTechChangeImage = (index, id) => {

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
                        console.error("Compression failed for tech doc image:", file.name, err);
                    }
                }

                setTechImages((prev) => {
                    const updated = [...prev];
                    updated[index] = finalImage;

                    if (formData?.productCode) {
                        dispatch({
                            type: EDIT_TECH_IMAGE_PRODUCT_SAGA,
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
                    updated[index] = finalImage;

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
            className="flex  font-Gilroy items-center border border-gray-300 rounded-md px-3 py-2.5 text-md text-gray-700 cursor-pointer"
            onClick={onClick}
            ref={ref}
            style={{ width: "300px" }}
        >
            <input
                type="text"
                className="flex-1 w-full font-Gilroy bg-transparent outline-none py-0.5  font-medium text-sm text-slate-500 placeholder-gray-400"
                value={value}
                placeholder={placeholder}
                readOnly
            />
            <CalendarDays className="text-gray-400 ml-2" size={18} />
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
                subCategory: formData.subCategory,
                make: formData.make,
                countryOfOrigin: formData.country,
                manufaturingYearAndMonth: selectedDate,
                State: formData.stateName,
                district: formData.district,
                brand: formData.brand,
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
                subCategory: formData.subCategory,
                make: formData.make,
                countryOfOrigin: formData.country,
                manufaturingYearAndMonth: selectedDate,
                State: formData.stateName,
                district: formData.district,
                brand: formData.brand,
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
        dispatch({ type: GET_CATEGORY_SAGA })
        dispatch({ type: GET_BRAND_SAGA })

    }, [])



    useEffect(() => {
        if (formData.category) {
            dispatch({ type: GET_SUB_CATEGORY_SAGA, payload: { catId: Number(formData.category) } })
        }
    }, [formData.category])


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
        if (errors.imageErrors) {
            const timer = setTimeout(() => {
                setErrors({});
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors.imageErrors]);


    useEffect(() => {
        if (errors.techImagesErrorr) {
            const timer = setTimeout(() => {
                setErrors(prev => ({ ...prev, techImagesError: "" }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors.techImagesError]);


    useEffect(() => {
        if (errors.serialNo) {
            const timer = setTimeout(() => {
                setErrors(prev => ({ ...prev, serialNo: "" }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors.serialNo]);



    useEffect(() => {
        return () => {
            images.forEach(img => {
                if (img instanceof File) {
                    URL.revokeObjectURL(img);
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






    return (
        <div className="bg-gray-100 p-6 min-h-screen flex w-full justify-center relative">

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                    <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
                </div>
            )}



            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                <h2 className="text-xl font-semibold mb-4 font-Gilroy">{editDetails ? 'Edit Product' : 'Add Product'}</h2>

                {
                    isChanged && <label className="block  mb-2 text-start font-Gilroy font-normal text-md text-red-600"> {isChanged} </label>
                }

                {
                    state.Common?.errorMessage && <label className="block  mb-2 text-start font-Gilroy font-normal text-md text-red-600"> {state.Common.errorMessage} </label>
                }

                <div className="flex-1 mx-auto  max-w-7xl rounded-xl max-h-[400px] overflow-y-auto lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3">

                    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] mb-2 items-start ">
                        <div className="w-full flex flex-col h-full">
                            <div>
                                <label className="block font-normal text-md font-Outfit mb-1">
                                    Product Code (Unique) <span className="text-red-500 text-lg">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`mb-1 focus:outline-none w-[290px] border border-gray-300 rounded-lg px-3 py-3 font-medium text-sm  font-Gilroy  ${formData.productCode ? "text-slate" : "text-slate-500"}`}
                                    placeholder="Enter Product code"
                                    name="productCode"
                                    value={formData.productCode}
                                    onChange={(e) => handleInputChange('productCode', e.target.value)}
                                />
                                {errors.productCode && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy">
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
                                    className={`mb-1 focus:outline-none w-[290px] border border-gray-300 rounded-lg px-3 py-3 font-medium text-sm ${formData.productN ? "text-slate" : "text-slate-500"} font-Gilroy`}
                                    placeholder="Enter Product Name"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={(e) => handleInputChange('productName', e.target.value)}
                                />
                                {errors.productName && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy">
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
                                    placeholder="Enter Description"
                                    className={`mt-1 focus:outline-none w-[290px] p-4 border rounded-lg h-36 font-medium text-sm ${formData.description ? "text-slate" : "text-slate-500"} font-Gilroy`}
                                    name="description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy">
                                        <InfoCircle size={16} color="#DC2626" />
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </div>


                        {/* images  */}
                        <div className="w-full p-2 flex flex-col h-full">
                            <label className="block font-normal text-md font-Outfit ps-2"> {editDetails ? "Edit Photos" : "Add Photos"}</label>

                            {errors.imageErrors && (
                                <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                    <InfoCircle size={16} color="#DC2626" />
                                    {errors.imageErrors}
                                </p>

                            )}

                            <div className="flex mt-2 gap-0 relative z-10">



                                {
                                    images.length > 3 && <div className="absolute left-[0px] top-1/2 -translate-y-1/2 z-20 ">
                                        <PrevArrow />

                                    </div>
                                }

                                {
                                    images.length > 3 && <div className='absolute right-[150px] top-1/2 -translate-y-1/2 z-20'>
                                        <NextArrow />

                                    </div>
                                }


                                <div ref={scrollRef} className="flex flex-row items-center max-w-[500px] ml-[10px] overflow-x-scroll">
                                    {images?.length > 0 && (
                                        <div className="bg-white flex flex-row">
                                            {images.map((img, index) => {
                                                let imageSrc = "";

                                                if (typeof img === "string") {
                                                    imageSrc = img;
                                                } else if (img instanceof File) {
                                                    imageSrc = URL.createObjectURL(img);
                                                } else if (img.url) {
                                                    imageSrc = img.url;
                                                }


                                                return (
                                                    <div key={index} className="px-1">
                                                        <div className="relative w-32 h-32 rounded-md overflow-hidden  border border-zinc-300 group" >

                                                            <img
                                                                src={imageSrc}
                                                                alt={`uploaded-${index}`}
                                                                className={` cursor-pointer w-full h-full ${img.type === 'image/svg+xml' ? '' : 'object-cover'}`}
                                                            />
                                                            <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black bg-opacity-50 transition duration-300 ">

                                                                <div className="flex items-center  space-x-2">

                                                                    {
                                                                        editDetails && images?.length > 0 ?
                                                                            <>

                                                                                <div
                                                                                    className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white bg-opacity-50 cursor-pointer"
                                                                                    onClick={() => handleEditChangeImage(index, img.id)}
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
                                                                                    onClick={() => handleImageDelete(img.id)}
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


                                <div className="w-32 h-32 border-dashed border flex items-center justify-center rounded-md cursor-pointer bg-white">
                                    {
                                        editDetails ?

                                            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
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
                                            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
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
                                    }

                                </div>

                            </div>






                            <label className="block font-normal text-md font-Outfit mt-2 ps-2">Technical</label>

                            {errors.techImagesError && (
                                <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                    <InfoCircle size={16} color="#DC2626" />
                                    {errors.techImagesError}
                                </p>

                            )}



                            <div className="flex mt-2 gap-0 relative z-10">

                                {
                                    techImages.length > 3 && <div className="absolute left-[0px] top-1/2 -translate-y-1/2 z-20 ">
                                        <PrevArrowTech />

                                    </div>
                                }

                                {
                                    techImages.length > 3 && <div className='absolute right-[150px] top-1/2 -translate-y-1/2 z-20'>
                                        <NextArrowTech />

                                    </div>
                                }
                                <div ref={scrollTechRef} className=' flex flex-row   items-center max-w-[500px] ml-[10px] overflow-x-scroll'>
                                    {techImages?.length > 0 && (
                                        <div className="bg-white flex flex-row">
                                            {techImages.map((img, index) => {


                                                let imageSrc = "";

                                                if (typeof img.url === "string") {
                                                    imageSrc = img.url;
                                                } else if (img instanceof File) {
                                                    imageSrc = URL.createObjectURL(img);
                                                } else if (img.url instanceof File) {
                                                    imageSrc = URL.createObjectURL(img.url);
                                                } else if (img.url) {
                                                    imageSrc = img.url;
                                                }

                                                return (
                                                    <div key={index} className="px-1">
                                                        <div className="relative w-32 h-32 rounded-md overflow-hidden group border border-zinc-300">
                                                            <img
                                                                src={imageSrc}
                                                                alt={`uploaded-${index}`}
                                                                className="w-full h-full object-cover"
                                                            />
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

                                        <label className="w-32 h-32 border-dashed border flex flex-col items-center justify-center rounded-md cursor-pointer">
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
                                        <label className="w-32 h-32 border-dashed border flex flex-col items-center justify-center rounded-md cursor-pointer">
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
                                }
                            </div>

                        </div>

                    </div>


                    <div>
                        <div className="flex flex-wrap gap-3 mb-3">
                            <div className="flex-1">
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
                            <div className="flex-1">
                                <label className="block font-normal text-md font-Outfit mb-1.5">Unit of measurement <span className="text-red-500 text-sm">*</span></label>
                                <div className="relative">
                                    <select
                                        value={formData.unit}
                                        onChange={(e) => handleInputChange('unit', e.target.value)}
                                        className="w-full cursor-pointer focus:outline-none p-3 border rounded-lg font-medium text-sm text-slate-400 appearance-none font-Gilroy">
                                        <option className='cursor-pointer' value="" disabled selected>Select Unit of measurement</option>
                                        <option value="kg">Kilogram (kg)</option>
                                        <option value="g">Gram (g)</option>
                                        <option value="l">Litre (l)</option>
                                        <option value="ml">Millilitre (ml)</option>
                                        <option value="pcs">Pieces (pcs)</option>
                                    </select>
                                    <svg className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {errors.unit && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                        <InfoCircle size={16} color="#DC2626" />
                                        {errors.unit}
                                    </p>
                                )}
                            </div>
                            <div className="flex-1 min-w-[250px] max-w-[340px]">
                                <label className="block font-normal text-md font-Outfit mb-1">Price</label>
                                <input
                                    type="text"
                                    value={formData.price}
                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                    className="w-full focus:outline-none border border-gray-300 rounded-lg px-3 py-3 font-medium text-sm text-slate-500 font-Gilroy"
                                    placeholder="Enter Price"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-3">

                            <div className="flex-1 min-w-[250px] max-w-[340px]">
                                <label className="block font-normal text-md font-Outfit mb-1 flex items-center gap-1">
                                    Currency
                                    <span className="text-red-500 text-sm">*</span>
                                </label>
                                <div className='relative'>
                                    <select
                                        value={formData.currency}
                                        onChange={(e) => handleInputChange('currency', e.target.value)}
                                        className="w-full focus:outline-none px-3 py-3 border rounded-xl  appearance-none focus:outline-none  capitalize font-Gilroy font-medium text-sm text-neutral-800" >
                                        <option value="">Select beneficiary currency</option>
                                        <option value="USD">USD</option>
                                        <option value="INR">INR</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="JPY">JPY</option>

                                    </select>

                                    <svg className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>

                                </div>

                                {errors.currency && (
                                    <p className="text-red-500 mt-1 text-xs flex items-center gap-1 font-Gilroy">
                                        <InfoCircle size={16} color="#DC2626" />
                                        {errors.currency}
                                    </p>
                                )}
                            </div>

                            <div className="flex-1 min-w-[250px] max-w-[340px]">
                                <label className="block font-normal text-md font-Outfit mb-1">Weight</label>


                                <input
                                    type="text"
                                    value={formData.weight}
                                    onChange={(e) => handleInputChange('weight', e.target.value)}
                                    placeholder="Enter Weight"
                                    className="w-full border focus:outline-none border-gray-300 rounded-lg px-3 py-3 font-medium text-sm text-slate-500 font-Gilroy"
                                />



                            </div>

                            <div className="flex-1 min-w-[250px] max-w-[340px]">
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

                        </div>

                        <div className="flex flex-wrap gap-3 mb-3">
                            <div className="flex-1">
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
                            <div className="flex-1 min-w-[250px] max-w-[340px]">
                                <label className="block font-normal text-md font-Outfit mb-1">Gst</label>
                                <div className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden">
                                    <div className="px-3 py-2 border-r text-slate-400 text-sm">%</div>
                                    <input
                                        type="text"
                                        value={formData.gst}
                                        onChange={(e) => handleInputChange('gst', e.target.value)}
                                        placeholder="Enter GST"
                                        className="w-full focus:outline-none px-3 py-3 font-medium text-sm text-slate-400 focus:outline-none font-Gilroy"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 min-w-[250px] max-w-[340px]">
                                <label className="block font-normal text-md font-Outfit mb-1">Serial No</label>
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={handleSerialInputChange}
                                    disabled={!formData.availableQuantity}
                                    placeholder="Enter Serial No"
                                    className="w-full focus:outline-none border border-gray-300 rounded-lg px-3 py-3 font-medium text-sm text-slate-500 font-Gilroy"
                                />
                                {errors.serialNo && (
                                    <p className="text-red-500 mt-1 text-xs flex items-center gap-1 font-Gilroy">
                                        <InfoCircle size={16} color="#DC2626" />
                                        {errors.serialNo}
                                    </p>
                                )}

                            </div>





                        </div>

                        <div className="flex flex-wrap gap-3 mb-3">
                            <div className="flex-1 ">
                                <label className="block font-normal text-md font-Outfit mb-1.5">
                                    Brand   <span className="text-red-500 text-sm">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.brand}
                                        onChange={(e) => handleInputChange('brand', e.target.value)}
                                        className="w-full focus:outline-none p-3 border border-gray-300 rounded-lg font-medium text-sm text-slate-400 appearance-none font-Gilroy">
                                        <option value="" disabled selected>Select Brand</option>
                                        {state?.product?.brandList.length > 0 ? state?.product?.brandList?.map((brand, index) => (
                                            <option key={index} value={brand.id}>
                                                {brand.name}
                                            </option>
                                        ))


                                            :
                                            <option >
                                                No brand available
                                            </option>
                                        }
                                    </select>


                                    <svg className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                {errors.brand && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                        <InfoCircle size={16} color="#DC2626" />
                                        {errors.brand}
                                    </p>
                                )}
                            </div>

                            <div className="flex-1 ">
                                <label className="block font-normal text-md font-Outfit mb-1.5">
                                    Category   <span className="text-red-500 text-sm">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        className="w-full focus:outline-none p-3 border border-gray-300 rounded-lg font-medium text-sm text-slate-400 appearance-none font-Gilroy">
                                        <option value="" disabled selected>Select Category</option>
                                        {state?.product?.categoryList.length > 0 ? state?.product?.categoryList?.map((category, index) => (
                                            <option key={index} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))
                                            :
                                            <option >
                                                No category available
                                            </option>
                                        }
                                    </select>


                                    <svg className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {errors.category && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                        <InfoCircle size={16} color="#DC2626" />
                                        {errors.category}
                                    </p>
                                )}
                            </div>
                            <div className="flex-1">
                                <label className="block font-normal text-md font-Outfit mb-1.5">
                                    Sub Category
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.subCategory}
                                        onChange={(e) => handleInputChange('subCategory', e.target.value)}

                                        className="w-full p-3 focus:outline-none border border-gray-300 rounded-lg font-medium text-sm text-slate-400 appearance-none font-Gilroy">
                                        <option value="" disabled selected>Select Sub Category</option>
                                        {state?.product?.subCategoryList.length > 0 ? state?.product?.subCategoryList?.map((subcategory, index) => (
                                            <option key={index} value={subcategory.id}>
                                                {subcategory.name}
                                            </option>
                                        ))
                                            :
                                            <option >
                                                No sub category available
                                            </option>
                                        }
                                    </select>


                                    <svg className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-wrap gap-3 mb-3">
                            <div className="flex-1 ">
                                <label className="block font-normal text-md font-Outfit mb-1">Make</label>
                                <div className="relative">
                                    <select
                                        value={formData.make}
                                        onChange={(e) => handleInputChange('make', e.target.value)}
                                        className="w-full p-3 focus:outline-none border border-gray-300 rounded-lg font-medium text-sm text-slate-400 appearance-none font-Gilroy">
                                        <option value="" disabled selected>Select Make</option>
                                        <option value="2011">2011</option>
                                        <option value="2012">2012</option>
                                        <option value="2013">2013</option>
                                        <option value="2014">2014</option>
                                    </select>

                                    <svg className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1 ">
                                <label className="block font-normal text-md font-Outfit mb-1">Country of Origin</label>
                                <div className="relative">
                                    <select
                                        value={formData.country}
                                        onChange={(e) => handleInputChange('country', e.target.value)}
                                        className="w-full focus:outline-none p-3 border border-gray-300 rounded-lg font-medium text-sm text-slate-400 appearance-none font-Gilroy">
                                        <option value="" disabled>
                                            Enter Country of Origin
                                        </option>
                                        <option value="india">India</option>
                                        <option value="usa">United States</option>
                                        <option value="china">China</option>
                                        <option value="germany">Germany</option>
                                        <option value="japan">Japan</option>
                                        <option value="uk">United Kingdom</option>
                                    </select>

                                    <svg className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex-1 ">
                                <label className="block text-md font-Outfit font-medium text-[#1F2937] mb-1">
                                    Month and Year of Manufacture
                                </label>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className='font-Gilroy font-medium text-sm text-slate-400'
                                    placeholderText="Month and Year of Manufacture"
                                    customInput={<CustomInput />}
                                />
                            </div>

                        </div>

                        <div className="flex flex-wrap gap-3 mb-3">
                            <div className="flex-1 max-w-[290px]">
                                <label className="block font-normal text-md font-Outfit mb-1">State</label>
                                <div className="relative">
                                    <select
                                        value={formData.stateName}
                                        onChange={(e) => handleInputChange('stateName', e.target.value)}

                                        className=" focus:outline-none w-full p-3 border border-gray-300 rounded-lg font-medium text-sm text-slate-400 appearance-none font-Gilroy">
                                        <option value="" disabled selected>
                                            Enter State
                                        </option>
                                        <option value="tamil-nadu">Tamil Nadu</option>
                                        <option value="maharashtra">Maharashtra</option>
                                        <option value="karnataka">Karnataka</option>
                                        <option value="delhi">Delhi</option>
                                        <option value="kerala">Kerala</option>
                                        <option value="gujarat">Gujarat</option>
                                        <option value="rajasthan">Rajasthan</option>
                                        <option value="west-bengal">West Bengal</option>
                                        <option value="uttar-pradesh">Uttar Pradesh</option>
                                        <option value="andhra-pradesh">Andhra Pradesh</option>
                                    </select>

                                    <svg
                                        className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>


                            <div className="flex-1 max-w-[290px]">
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
                    </div>




                    {/* additional field  */}

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
                                                    className="w-full border  focus:outline-none border-gray-300 rounded-lg px-3 py-[10px] text-sm font-Gilroy font-medium text-gray-700 appearance-none"
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

                    <button className='bg-blue-900 px-4 py-3 rounded-lg text-base font-bold text-white flex items-center mt-3 font-Outfit' onClick={updateShowAdditionalFields} >+ Additional Field</button>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
                    <button onClick={handleClose} className="bg-white border border-rose-600 text-rose-600 font-medium py-2 px-6 rounded-lg font-Montserrat">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="bg-blue-900 text-white font-medium py-2 px-6 rounded-lg font-Montserrat">
                        Submit
                    </button>
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