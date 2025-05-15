/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import Select from "react-select";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Trash } from "iconsax-react";
import InvoiceAddProduct from "../../Pages/Invoice/InvoiceAddProduct";
import AddBox from "../../Pages/Invoice/AddBox";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { GET_CUSTOMER_LIST_SAGA, GET_CUSTOMER_DETAILS_SAGA, GET_PORT_SAGA, GET_PAYMENT_TERM_SAGA, GET_DELIVERY_TERM_SAGA } from '../../Utils/Constant';
import { format } from 'date-fns';
import { InfoCircle } from "iconsax-react";



function AddInvoice() {



    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const [officeAddress, setOfficeAddress] = useState('')
    const [shippingAddress, setShippingAddress] = useState('')
    const [rows, setRows] = useState([
        { poNumber: '', date: null }
    ]);
    const [value, setValue] = useState(1);
    const rowRefs = useRef([]);
    const [errors, setErrors] = useState({});
    const [showBox, setShowBox] = useState(false)
    const [showProduct, setShowProduct] = useState(false)
    const [customerOptions, setCustomerOptions] = useState([])

    const [formData, setFormData] = useState({
        customer: "",
        invoiceType: null,
        invoiceNo: '',
        currency: null,
        invoiceDate: null,
        originOfGoods: null,
        portOfLoading: null,
        portOfDischarge: null,
        destinationCountry: null,
        deliveryTerm: null,
        place: null,
        paymentTerm: '',
        shippingBillNo: '',
        shippingBillDate: null,
        bankPaymentRefNo: '',
        billOfLading: '',
        billOfLadingDate: null,
        noOfPackage: '',
        netWeight: '',
        grossWeight: '',
        freight: '',
        insurance: ''
    });


    const [items, setItems] = useState([
        { itemNo: '', description: '', hsn: '', qty: '', unitCost: '', total: '', packageNo: '' }
    ]);

    const [itemErrors, setItemErrors] = useState([]);
    const rowItemsRefs = useRef([]);







    const tabs = [
        { id: 1, label: "Customer Detail" },
        { id: 2, label: "Invoice Detail" },
        { id: 3, label: "Item Detail" },
        { id: 4, label: "Packaging Detail" }

    ];

    const options = [
        { value: "", label: "Select Country", isPlaceholder: true },
        { value: "India", label: "India" },
        { value: "United States", label: "United States" },
        { value: "United Kingdom", label: "United Kingdom" },
        { value: "Australia", label: "Australia" },
        { value: "Canada", label: "Canada" },
        { value: "Germany", label: "Germany" },
        { value: "France", label: "France" },
        { value: "Italy", label: "Italy" },
        { value: "Singapore", label: "Singapore" },
        { value: "Japan", label: "Japan" },
        { value: "China", label: "China" },
    ];

    const InvoiceOptions = [
        { value: "", label: "Select Type", isPlaceholder: true },
        { value: "EXPORT", label: "EXPORT" },
        { value: "DOMESTIC", label: "DOMESTIC" },
    ]


    const beneficiaryCurrencyOptions = [
        { value: "", label: "Select Currency", isPlaceholder: true },
        { value: "USD", label: "USD" },
        { value: "INR", label: "INR" },
        { value: "EUR", label: "EUR" },
        { value: "GBP", label: "GBP" },
        { value: "JPY", label: "JPY" }
    ];


    const portOptions = [
        { value: "", label: "Select Port", isPlaceholder: true },
        ...state.invoice.portList.map((port) => ({
            value: port.portCode,
            label: `${port.portCode} - ${port.city}`
        }))
    ];

    const paymentTermOptions = [
        { value: "", label: "Select Payment Term", isPlaceholder: true },
        ...state.invoice.paymentTermList.map((payment) => ({
            value: payment.id,
            label: payment.type
        }))
    ];

    const deliveryTermOptions = [
        { value: "", label: "Select Delivery Term", isPlaceholder: true },
        ...state.invoice.deliveryTermList.map((delivery) => ({
            value: delivery.id,
            label: delivery.type
        }))
    ];





    const customerRef = useRef();
    const invoiceTypeRef = useRef();
    const invoiceNoRef = useRef();
    const currencyRef = useRef();
    const invoiceDateRef = useRef();
    const originOfGoodsRef = useRef();
    const portOfLoadingRef = useRef();
    const portOfDischargeRef = useRef();
    const destinationCountryRef = useRef();
    const deliveryTermRef = useRef();
    const paymentTermRef = useRef();
      const bankPaymentRefNoRef = useRef();
    const freightRef = useRef();
    const insuranceRef = useRef();
    const placeRef = useRef();


    const handleAddItem = () => {
        setItems([
            ...items,
            { itemNo: '', description: '', hsn: '', qty: '', unitCost: '', total: '', packageNo: '' }
        ]);
    };


    const handleAddRow = () => {
        setRows([...rows, { poNumber: '', date: null }]);
    };

    const handleRemoveRow = (index) => {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows);
    };

    const handleInputChange = (index, field, value) => {
        const formattedValue = field === 'date' ? format(value, 'yyyy/MM/dd') : value;
        const updatedRows = [...rows];
        updatedRows[index][field] = formattedValue;
        setRows(updatedRows);
        setErrors((prevErrors) => {
            const updatedRowErrors = [...(prevErrors.rowErrors || [])];
            if (updatedRowErrors[index]) {
                updatedRowErrors[index] = { ...updatedRowErrors[index], [field]: '' };
            }

            return {
                ...prevErrors,
                rowErrors: updatedRowErrors,
            };
        });
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        const updatedErrors = [...itemErrors];


        if ((field === 'qty' || field === 'unitCost' || field === 'packageNo') && !/^\d*\.?\d*$/.test(value)) {
            return;
        }

        updatedItems[index][field] = value;


        if (updatedErrors[index]) {
            switch (field) {
                case 'itemNo':
                case 'description':
                case 'hsn':
                case 'packageNo':
                    if (value.trim()) {
                        delete updatedErrors[index][field];
                    }
                    break;
                case 'qty':
                case 'unitCost':
                    if (value && !isNaN(value)) {
                        delete updatedErrors[index][field];
                    }

                    break;
                default:

                    break;
            }
        }


        if (field === 'qty' || field === 'unitCost') {
            const qty = parseFloat(updatedItems[index].qty) || 0;
            const unit = parseFloat(updatedItems[index].unitCost) || 0;
            updatedItems[index].total = (qty * unit).toFixed(2);
        }

        setItems(updatedItems);
        setItemErrors(updatedErrors);
    };



    const grandTotal = items.reduce((sum, item) => {
        const total = parseFloat(item.total || item.totalCost || 0);
        return sum + total;
    }, 0);




    const handleTabClick = (id) => {
        if (id === 2) {
            if (validateCustomerForm()) {
                setValue(id);
            }
        } else if (id === 3) {
            if (validateInvoiceForm()) {
                setValue(id);
            }
        } else if (id === 4) {
            if (validateItemsForm()) {
                setValue(id);
            }

        } else {
            setValue(id);
        }
    };


    const handleNextInvoiceDetail = () => {
        if (validateCustomerForm()) {
            setValue(2)
        }
    }

    const handleNextItemDetail = () => {
        if (validateInvoiceForm()) {
            setValue(3)
        }

    }


    const handleNextPackageDetail = () => {
        if (validateItemsForm()) {
            setValue(4)
        }

    }



    const customSelectStateStyles = {
        control: (base) => ({
            ...base,
            borderColor: '#E5E7EB',
            borderRadius: '0.6rem',
            boxShadow: 'none',
            cursor: 'pointer',
            padding: '4px 1px',
            minHeight: '40px',
            '&:hover': {
                borderColor: '#E5E7EB',
            },
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#205DA8' : 'white',
            color: state.isFocused ? 'white' : 'black',
            fontWeight: 500,
            padding: '4px 10px',
            cursor: 'pointer',
            fontSize: "14px",
            fontFamily: 'Gilroy',
        }),
        menu: (base) => ({
            ...base,
            maxHeight: '120px',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            transition: 'all 0.3s ease-in-out',
            transformOrigin: 'top',
            overscrollBehaviorY: 'contain',
        }),
        menuList: (base) => ({
            ...base,
            maxHeight: '120px',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'thin',
            paddingRight: '4px',
            '&::-webkit-scrollbar': {
                width: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#cbd5e1',
                borderRadius: '6px',
            },
        }),
        singleValue: (base, state) => {
            const isPlaceholderSelected = state.data?.isPlaceholder;
            return {
                ...base,
                fontFamily: "Gilroy",
                fontWeight: 500,
                fontSize: "14px",
                textTransform: "capitalize",
                color: isPlaceholderSelected ? "oklch(70.8% 0 0)" : "black",
            };
        },
        placeholder: (base) => ({
            ...base,
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "Gilroy, sans-serif",
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
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



    const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
        <input
            type="text"
            onClick={onClick}
            ref={ref}
            value={value}
            placeholder={placeholder}
            readOnly
            className="w-full px-3 py-3 border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800 cursor-pointer"
        />
    ));

    const CustomDateInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
        <input
            ref={ref}
            value={value}
            onClick={onClick}
            readOnly
            placeholder={placeholder}
            className="w-full px-3 py-3 border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800"
        />
    ));


    const CustomDateInputWrapper = ({ inputRef, ...props }) => (
        <CustomDateInput {...props} ref={inputRef} />
    );



    CustomInput.displayName = 'CustomInput';
    CustomDateInput.displayName = 'CustomDateInput'

    const handleAddProduct = () => {
        setShowProduct(true)
    }

    const handleCloseAddProduct = () => {
        setShowProduct(false)
    }


    const handleAddBox = () => {
        setShowBox(true)
    }




    const handleCloseAddBox = () => {
        setShowBox(false)
    }


    const handleInputChangeForInvoice = (field, value) => {
        let formattedValue = value;


        if (['invoiceDate', 'shippingBillDate', 'billOfLadingDate'].includes(field)) {
            formattedValue = format(value, 'yyyy/MM/dd');
        }



        const numberOnlyFields = ['noOfPackage', 'netWeight', 'grossWeight', 'freight', 'insurance', 'shippingBillNo'];
        const noSpecialCharFields = ['billOfLading'];

        let isValid = true;

        if (numberOnlyFields.includes(field)) {
            const regex = /^[0-9]*$/;
            isValid = regex.test(formattedValue);
        } else if (noSpecialCharFields.includes(field)) {
            const regex = /^[A-Za-z0-9\s]*$/;
            isValid = regex.test(formattedValue);
        }

        if (!isValid) {
            setErrors((prev) => ({
                ...prev,
                [field]: `Invalid value for ${field}`,
            }));
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            [field]: formattedValue,
        }));

        setErrors((prev) => ({
            ...prev,
            [field]: '',
        }));
    };






    const validateCustomerForm = () => {
        const newErrors = {};

        if (!formData.customer) {
            newErrors.customer = 'Please select a customer';
        }

        setErrors(newErrors);


        if (Object.keys(newErrors).length > 0) {
            if (newErrors.customer) {
                customerRef.current?.focus();
            }
            return false;
        }

        return true;
    };



    const validateInvoiceForm = () => {
        const newErrors = {};
        let isValid = true;


        if (!formData.invoiceType) { newErrors.invoiceType = 'Invoice type is required'; isValid = false; }
        if (!formData.invoiceNo) { newErrors.invoiceNo = 'Invoice number is required'; isValid = false; }
        if (!formData.currency) { newErrors.currency = 'Currency is required'; isValid = false; }
        if (!formData.invoiceDate) { newErrors.invoiceDate = 'Invoice date is required'; isValid = false; }
        if (!formData.originOfGoods) { newErrors.originOfGoods = 'Origin of goods is required'; isValid = false; }
        if (!formData.portOfLoading) { newErrors.portOfLoading = 'Port of loading is required'; isValid = false; }
        if (!formData.portOfDischarge) { newErrors.portOfDischarge = 'Port of discharge is required'; isValid = false; }
        if (!formData.destinationCountry) { newErrors.destinationCountry = 'Destination country is required'; isValid = false; }
        if (!formData.deliveryTerm) { newErrors.deliveryTerm = 'Delivery term is required'; isValid = false; }
        if (!formData.place) { newErrors.place = 'Place is required'; isValid = false; }
        if (!formData.paymentTerm) { newErrors.paymentTerm = 'Payment term is required'; isValid = false; }
        if (!formData.bankPaymentRefNo) { newErrors.bankPaymentRefNo = 'Bank payment reference number is required'; isValid = false; }
        if (!formData.freight) { newErrors.freight = 'Freight is required'; isValid = false; }
        if (!formData.insurance) { newErrors.insurance = 'Insurance is required'; isValid = false; }


        newErrors.rowErrors = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowError = {};

            if (!row.poNumber.trim()) {
                rowError.poNumber = 'PO Number is required';
                isValid = false;
            }

            if (!row.date) {
                rowError.date = 'Date is required';
                isValid = false;
            }

            newErrors.rowErrors[i] = rowError;
        }

        setErrors(newErrors);


        if (!isValid) {
            let focusSet = false;

            if (newErrors.invoiceType && !focusSet) {
                invoiceTypeRef.current?.focus();
                focusSet = true;
            }
            else if (newErrors.invoiceNo && !focusSet) {
                invoiceNoRef.current?.focus();
                focusSet = true;
            }
            else if (newErrors.currency && !focusSet) {
                currencyRef.current?.focus();
                focusSet = true;
            }
            else if (newErrors.invoiceDate && !focusSet) {
                invoiceDateRef.current?.focus();
                focusSet = true;
            }
            else if (newErrors.originOfGoods && !focusSet) {
                originOfGoodsRef.current?.focus();
                focusSet = true;
            }
            else if (newErrors.portOfLoading && !focusSet) {
                portOfLoadingRef.current?.focus();
                focusSet = true;
            }
            else if (newErrors.portOfDischarge && !focusSet) {
                portOfDischargeRef.current?.focus();
                focusSet = true;
            }
            else if (newErrors.destinationCountry && !focusSet) {
                destinationCountryRef.current?.focus();
                focusSet = true;
            }
            else if (newErrors.deliveryTerm && !focusSet) {
                deliveryTermRef.current?.focus();
                focusSet = true;
            }
            else if (newErrors.place && !focusSet) {
                placeRef.current?.focus();
                focusSet = true;
            }
            else if (newErrors.paymentTerm && !focusSet) {
                paymentTermRef.current?.focus();
                focusSet = true;
            }
            else if (newErrors.bankPaymentRefNo && !focusSet) {
                bankPaymentRefNoRef.current?.focus();
                focusSet = true;
            }
            else if (newErrors.freight && !focusSet) {
                freightRef.current?.focus();
                focusSet = true;
            }
            else if (newErrors.insurance && !focusSet) {
                insuranceRef.current?.focus();
                focusSet = true;
            }

            for (let i = 0; i < newErrors.rowErrors.length; i++) {
                const rowError = newErrors.rowErrors[i] || {};
                const refs = rowRefs.current[i] || {};


                if (rowError.poNumber && !focusSet) {
                    refs.po?.current?.focus();
                    focusSet = true;
                }


                if (rowError.date && !focusSet) {
                    const dateRef = rowRefs.current[i]?.date?.current;
                    if (dateRef) {
                        dateRef.focus();
                        focusSet = true;
                    }
                }
                if (focusSet) break;
            }


            return false;
        }

        return true;
    };





    const validateItemsForm = () => {
        const errors = [];
        let focusSet = false;

        items.forEach((item, index) => {
            const rowError = {};

            if (!item.itemNo.trim()) {
                rowError.itemNo = 'Please enter Item No.';
                if (!focusSet) {
                    rowItemsRefs.current[index]?.itemNo?.focus();
                    focusSet = true;
                }
            }

            if (!item.description.trim()) {
                rowError.description = 'Please enter Description.';
                if (!focusSet) {
                    rowItemsRefs.current[index]?.description?.focus();
                    focusSet = true;
                }
            }

            if (!item.hsn.trim()) {
                rowError.hsn = 'Please enter HSN.';
                if (!focusSet) {
                    rowItemsRefs.current[index]?.hsn?.focus();
                    focusSet = true;
                }
            }

            if (!item.qty || isNaN(item.qty)) {
                rowError.qty = 'Enter valid Quantity.';
                if (!focusSet) {
                    rowItemsRefs.current[index]?.qty?.focus();
                    focusSet = true;
                }
            }

            if (!item.unitCost || isNaN(item.unitCost)) {
                rowError.unitCost = 'Enter valid Unit Cost.';
                if (!focusSet) {
                    rowItemsRefs.current[index]?.unitCost?.focus();
                    focusSet = true;
                }
            }

            if (!item.packageNo.trim()) {
                rowError.packageNo = 'Please enter Package No.';
                if (!focusSet) {
                    rowItemsRefs.current[index]?.packageNo?.focus();
                    focusSet = true;
                }
            }

            errors.push(rowError);
        });

        setItemErrors(errors);


        return errors.every((err) => Object.keys(err).length === 0);
    };



    const getInputRef = (field, index) => (el) => {
        if (!rowItemsRefs.current[index]) {
            rowItemsRefs.current[index] = {};
        }
        rowItemsRefs.current[index][field] = el;
    };







    const handleSaveExitForCustomerDetail = () => {
        if (validateCustomerForm()) {
            alert('validation success')
        }
    }


    const handleSaveExitForInvoiceDetail = () => {
        if (validateInvoiceForm()) {
            alert('validation success')
        }
    }


    const handleSaveExitForItemDetail = () => {
        if (validateItemsForm()) {
            alert('validation success')
        }
    }



    useEffect(() => {
        dispatch({ type: GET_PORT_SAGA })
        dispatch({ type: GET_PAYMENT_TERM_SAGA })
        dispatch({ type: GET_DELIVERY_TERM_SAGA })
    }, [])



    useEffect(() => {
        dispatch({ type: GET_CUSTOMER_LIST_SAGA, payload: { searchKeyword: "" } });
    }, []);


    useEffect(() => {

        rowRefs.current = rows.map((_, i) => rowRefs.current[i] || {
            po: React.createRef(),
            date: React.createRef(),
        });
    }, [rows.length]);


    useEffect(() => {
        rowRefs.current = rows.map((_, i) => {
            return rowRefs.current[i] || { po: React.createRef(), date: React.createRef() };
        });
    }, [rows]);


    useEffect(() => {
        rowRefs.current = items.map((_, i) => {
            return rowRefs.current[i] || {
                itemNo: React.createRef(),
                description: React.createRef(),
                hsn: React.createRef(),
                qty: React.createRef(),
                unitCost: React.createRef(),
                packageNo: React.createRef(),
            };
        });
    }, [items]);

    useEffect(() => {
        const Options = state.customer?.customerList?.map((item) => ({
            value: item.clientId,
            label: item.contactPerson,
        }));
        setCustomerOptions(Options)

    }, [state.customer.customerList])


    useEffect(() => {
        if (formData.customer) {
            dispatch({ type: GET_CUSTOMER_DETAILS_SAGA, payload: formData.customer });
        }
    }, [formData.customer]);


    const customer = formData.customer ? state.customer?.customerDetails : {};



    useEffect(() => {
        if (formData.customer) {
            const OfficeAddress = customer?.address?.filter((item) => item.addressType === "Office Address");
            setOfficeAddress(OfficeAddress || []);

            const ShippingAddress = customer?.address?.filter((item) => item.addressType === "Shipping Address");
            setShippingAddress(ShippingAddress || []);
        }
    }, [state.customer?.customerDetails]);




    return (
        <div className='bg-slate-100 flex flex-1 flex-col p-2 sm:p-2 md:p-2 lg:p-4 rounded-t-2xl'>
            <div className='bg-white  rounded-2xl ps-5 pt-3 pe-5 pb-5 relative h-fit'>

                <div className='flex items-center justify-between pe-12 mb-1'>
                    <h2 className="text-xl font-semibold  font-Gilroy text[#222222]">Add Invoice</h2>
                </div>


                <div className="flex flex-col  justify-between   items-center sm:flex-row   border-gray-300">
                    <div className='gap-8 mb-3 flex flex-row '>


                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`px-0 py-2 font-Gilroy ${value === tab.id
                                    ? "border-b-4 border-[#205DA8] text-[#205DA8] font-semibold text-base"
                                    : "text-gray-500 border-neutral-100 border-b-4 text-base"
                                    } transition-all duration-600`}
                                onClick={() => handleTabClick(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {
                        value === 4 &&
                        <div>
                            <label className='font-Gilroy text-base font-semibold text-[#205DA8] hover:underline cursor-pointer' onClick={handleAddBox}>+ Add Box</label>

                        </div>
                    }
                </div>






                {
                    value === 1 &&
                    <div className='max-h-[400px] overflow-y-auto  
                    lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3 ' >


                        <div className='mb-2 items-center w-[350px]'>
                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Customer</label>
                            <Select
                                ref={customerRef}
                                options={customerOptions}
                                placeholder="Enter Select"
                                classNamePrefix="custom"
                                menuPlacement="auto"
                                id="customer-select"
                                styles={customSelectStateStyles}
                                value={customerOptions.find(opt => opt.value === formData.customer)}
                                onChange={(e) => handleInputChangeForInvoice('customer', e.value)}
                            />


                            {errors.customer && (
                                <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                    <InfoCircle size={16} color="#DC2626" />
                                    <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.customer}</p>
                                </div>
                            )}


                        </div>



                        <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-3 mt-4'>

                            <div className='rounded-lg bg-[#EFF2F5] border-[#EFF2F5] min-h-[230px] p-4'>


                                <label className='block text-[#205DA8] text-sm font-Gilroy font-semibold mb-2'>Consignee</label>

                                <label className='block text-[#0F172A] text-lg font-Gilroy font-semibold mb-2'>{customer.contactPerson || 'Name'}</label>

                                <label className='block text-[#0F172A] text-base font-Gilroy font-medium mb-2'>
                                    {officeAddress?.length > 0 ? (
                                        officeAddress.map((office, index) => (
                                            <span className='block text-[#0F172A] text-base font-Gilroy font-medium pe-5' key={index}>{office.doorNo}{' '}{office.street}{''} {office.locality}{''} {office.address4}  {' '} {office.city} {' '} - {office.postalCode} </span>
                                        ))
                                    ) : (
                                        <span className='block text-[#0F172A] text-base font-Gilroy font-medium mb-2'  >No office address available</span>
                                    )}
                                </label>

                                <label className='block text-[#0F172A] text-base font-Gilroy font-medium mb-2'>{customer.emailId} </label>
                                <label className='block text-[#0F172A] text-base font-Gilroy font-medium mb-1'>
                                    {customer?.country_code && customer?.contactNumber
                                        ? ` + ${customer.country_code} ${customer.contactNumber}`
                                        : '-'}
                                </label>

                                <label className='block text-[#737982] text-base font-Gilroy font-medium mb-1'>GSTIN  : {customer.gstVat} </label>
                                <label className='block text-[#737982] text-base font-Gilroy font-medium'>IEC :</label>



                            </div>

                            <div className='rounded-lg bg-[#EFF2F5] border-[#EFF2F5] min-h-[230px] p-4'>


                                <label className='block text-[#205DA8] text-sm font-Gilroy font-semibold mb-2'>Consignee</label>

                                <label className='block text-[#0F172A] text-lg font-Gilroy font-semibold mb-2'>{customer.contactPerson || 'Name'}</label>

                                <label className='block text-[#0F172A] text-base font-Gilroy font-medium mb-2'>
                                    {shippingAddress?.length > 0 ? (
                                        shippingAddress.map((ship, index) => (
                                            <span className='block text-[#0F172A] text-base font-Gilroy font-medium pe-5' key={index}>
                                                {ship.doorNo} {ship.street} {ship.locality} {ship.address4} {ship.city} - {ship.postalCode}
                                            </span>
                                        ))
                                    ) : (
                                        <span className='block text-[#0F172A] text-base font-Gilroy font-medium pe-5'>
                                            {officeAddress?.length > 0 ? (
                                                officeAddress.map((office, index) => (
                                                    <span key={index}>
                                                        {office.doorNo} {office.street} {office.locality} {office.address4} {office.city} - {office.postalCode}
                                                    </span>
                                                ))
                                            ) : (
                                                'No shipping or office address available'
                                            )}
                                        </span>
                                    )}

                                </label>
                                <label className='block text-[#0F172A] text-base font-Gilroy font-medium mb-2'>{customer.emailId} </label>
                                <label className='block text-[#0F172A] text-base font-Gilroy font-medium mb-1'>
                                    {customer?.country_code && customer?.contactNumber
                                        ? ` + ${customer.country_code} ${customer.contactNumber}`
                                        : '-'} </label>

                                <label className='block text-[#737982] text-base font-Gilroy font-medium mb-1'>GSTIN  : {customer.gstVat} </label>
                                <label className='block text-[#737982] text-base font-Gilroy font-medium'>IEC :</label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 h-fit items-center mt-8">


                            <button className="w-[167px] px-10 py-2  border border-[#205DA8] rounded-lg text-[#205DA8] font-Montserrat text-base font-semibold" onClick={handleSaveExitForCustomerDetail}  >Save & Exit</button>

                            <button className="w-[167px] px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat text-base font-semibold" onClick={handleNextInvoiceDetail} >Next</button>

                        </div>


                    </div>
                }





                {
                    value === 2 &&
                    <>
                        <div className='max-h-[350px] overflow-y-auto  lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3 ' >


                            <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3 mt-4'>
                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Invoice Type <span className='text-red-500'>*</span></label>
                                    <Select
                                        ref={invoiceTypeRef}
                                        options={InvoiceOptions}
                                        placeholder="Select Invoice Type"
                                        classNamePrefix="custom"
                                        menuPlacement="auto"
                                        styles={customSelectStateStyles}
                                        value={InvoiceOptions.find(opt => opt.value === formData.invoiceType)}
                                        onChange={(e) => handleInputChangeForInvoice('invoiceType', e.value)}

                                    />
                                    {errors.invoiceType && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.invoiceType}</p>
                                        </div>
                                    )}

                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Invoice No  <span className='text-red-500'>*</span></label>
                                    <input
                                        type='text'
                                        ref={invoiceNoRef}
                                        placeholder='Enter Invoice No'
                                        value={formData.invoiceNo}
                                        onChange={(e) => handleInputChangeForInvoice('invoiceNo', e.target.value)}
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                    {errors.invoiceNo && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.invoiceNo}</p>
                                        </div>
                                    )}
                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Currency <span className='text-red-500'>*</span></label>
                                    <Select
                                        options={beneficiaryCurrencyOptions}
                                        placeholder="Select Currency"
                                        classNamePrefix="custom"
                                        menuPlacement="auto"
                                        ref={currencyRef}
                                        styles={customSelectStateStyles}
                                        value={beneficiaryCurrencyOptions.find(opt => opt.value === formData.currency)}
                                        onChange={(e) => handleInputChangeForInvoice('currency', e.value)}
                                    />
                                    {errors.currency && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.currency}</p>
                                        </div>
                                    )}
                                </div>


                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>
                                        Invoice Date <span className='text-red-500'>*</span>
                                    </label>
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full"
                                        placeholderText="Select Invoice Date"
                                        customInput={<CustomInput ref={invoiceDateRef} />}
                                        wrapperClassName="w-full"
                                        selected={formData.invoiceDate ? new Date(formData.invoiceDate) : null}
                                        onChange={(date) => handleInputChangeForInvoice('invoiceDate', date)}
                                    />
                                    {errors.invoiceDate && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.invoiceDate}</p>
                                        </div>
                                    )}
                                </div>


                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Origin of Goods  <span className='text-red-500'>*</span></label>
                                    <Select
                                        options={options}
                                        placeholder="Select Origin of Goods"
                                        classNamePrefix="custom"
                                        menuPlacement="auto"
                                        ref={originOfGoodsRef}
                                        styles={customSelectStateStyles}
                                        value={options.find(opt => opt.value === formData.originOfGoods)}
                                        onChange={(e) => handleInputChangeForInvoice('originOfGoods', e.value)}
                                    />
                                    {errors.originOfGoods && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.originOfGoods}</p>
                                        </div>
                                    )}
                                </div>
                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Port of Loading <span className='text-red-500'>*</span></label>
                                    <Select
                                        options={portOptions}
                                        placeholder="Select Port of Loading "
                                        classNamePrefix="custom"
                                        menuPlacement="auto"
                                        ref={portOfLoadingRef}
                                        styles={customSelectStateStyles}
                                        value={portOptions.find(opt => opt.value === formData.portOfLoading)}
                                        onChange={(e) => handleInputChangeForInvoice('portOfLoading', e.value)}
                                    />
                                    {errors.portOfLoading && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.portOfLoading}</p>
                                        </div>
                                    )}
                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Port of Discharge <span className='text-red-500'>*</span></label>
                                    <Select
                                        options={portOptions}
                                        placeholder="Select Port of Discharge"
                                        classNamePrefix="custom"
                                        menuPlacement="auto"
                                        ref={portOfDischargeRef}
                                        styles={customSelectStateStyles}
                                        value={portOptions.find(opt => opt.value === formData.portOfDischarge)}
                                        onChange={(e) => handleInputChangeForInvoice('portOfDischarge', e.value)}
                                    />
                                    {errors.portOfDischarge && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.portOfDischarge}</p>
                                        </div>
                                    )}
                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Destination Country  <span className='text-red-500'>*</span></label>
                                    <Select
                                        options={options}
                                        placeholder="Select Destination Country"
                                        classNamePrefix="custom"
                                        menuPlacement="auto"
                                        ref={destinationCountryRef}
                                        styles={customSelectStateStyles}
                                        value={options.find(opt => opt.value === formData.destinationCountry)}
                                        onChange={(e) => handleInputChangeForInvoice('destinationCountry', e.value)}
                                    />
                                    {errors.destinationCountry && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.destinationCountry}</p>
                                        </div>
                                    )}
                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>
                                        Delivery Term (Incoterms) <span className='text-red-500'>*</span>
                                    </label>

                                    <div className='flex gap-1'>
                                        <div className='flex-1'>
                                            <Select
                                                options={deliveryTermOptions}
                                                placeholder="Enter Delivery Term"
                                                classNamePrefix="custom"
                                                menuPlacement="auto"
                                                ref={deliveryTermRef}
                                                styles={customSelectStateStyles}
                                                value={deliveryTermOptions.find(opt => opt.value === formData.deliveryTerm)}
                                                onChange={(e) => handleInputChangeForInvoice('deliveryTerm', e.value)}
                                            />
                                        </div>

                                        <div className='flex-1'>
                                            <input
                                                type='text'
                                                ref={placeRef}
                                                placeholder='Enter place'
                                                value={formData.place}
                                                onChange={(e) => handleInputChangeForInvoice('place', e.target.value)}
                                                className='w-full px-3 py-3 border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                        </div>
                                    </div>


                                    {errors.deliveryTerm && errors.place ? (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <p className="text-red-500 text-xs mt-1 font-Gilroy">Delivery Term & Place are required</p>
                                        </div>
                                    ) : errors.deliveryTerm ? (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.deliveryTerm}</p>
                                        </div>
                                    ) : errors.place ? (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.place}</p>
                                        </div>
                                    ) : null}

                                </div>


                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Payment Term <span className='text-red-500'>*</span></label>

                                    <Select
                                        options={paymentTermOptions}
                                        placeholder="Enter Payment Term"
                                        classNamePrefix="custom"
                                        menuPlacement="auto"
                                        ref={paymentTermRef}
                                        styles={customSelectStateStyles}
                                        value={paymentTermOptions.find(opt => opt.value === formData.paymentTerm)}
                                        onChange={(e) => handleInputChangeForInvoice('paymentTerm', e.value)}
                                    />

                                    {errors.paymentTerm && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.paymentTerm}</p>
                                        </div>
                                    )}
                                </div>


                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Shipping Bill No.</label>

                                    <input
                                        type='text'
                                        placeholder='Enter Shipping Bill No.'
                                        value={formData.shippingBillNo}
                                        onChange={(e) => handleInputChangeForInvoice('shippingBillNo', e.target.value)}
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>
                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Shipping Bill No. Date</label>

                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full"
                                        placeholderText="Select Shipping Bill No. Date"
                                        customInput={<CustomInput />}
                                        wrapperClassName="w-full"
                                        selected={formData.shippingBillDate ? new Date(formData.shippingBillDate) : null}
                                        onChange={(date) => handleInputChangeForInvoice('shippingBillDate', date)}
                                    />
                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Payment Reference No. <span className='text-red-500'>*</span></label>

                                    <input
                                        type='text'
                                        placeholder='Enter Bank Payment Reference No.'
                                        ref={bankPaymentRefNoRef}
                                        value={formData.bankPaymentRefNo}
                                        onChange={(e) => handleInputChangeForInvoice('bankPaymentRefNo', e.target.value)}
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />

                                    {errors.bankPaymentRefNo && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.bankPaymentRefNo}</p>
                                        </div>
                                    )}
                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bill of Lading </label>

                                    <input
                                        type='text'
                                        placeholder='Enter Bill of Lading'
                                        value={formData.billOfLading}
                                        onChange={(e) => handleInputChangeForInvoice('billOfLading', e.target.value)}
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>


                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bill of Lading Date </label>

                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full"
                                        placeholderText="Select Bill of Lading Date"
                                        customInput={<CustomInput />}
                                        wrapperClassName="w-full"
                                        selected={formData.billOfLadingDate ? new Date(formData.billOfLadingDate) : null}
                                        onChange={(date) => handleInputChangeForInvoice('billOfLadingDate', date)}
                                    />
                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>No of Package</label>

                                    <input
                                        type='text'
                                        placeholder='Enter No of Package'
                                        value={formData.noOfPackage}
                                        onChange={(e) => handleInputChangeForInvoice('noOfPackage', e.target.value)}
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Net Weight</label>

                                    <input
                                        type='text'
                                        placeholder='Enter Net Weight'
                                        value={formData.netWeight}
                                        onChange={(e) => handleInputChangeForInvoice('netWeight', e.target.value)}
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>
                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Gross Weight</label>

                                    <input
                                        type='text'
                                        placeholder='Enter Gross Weight'
                                        value={formData.grossWeight}
                                        onChange={(e) => handleInputChangeForInvoice('grossWeight', e.target.value)}
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Freight <span className='text-red-500'>*</span></label>

                                    <input
                                        type='text'
                                        placeholder='Enter Freight'
                                        value={formData.freight}
                                        ref={freightRef}
                                        onChange={(e) => handleInputChangeForInvoice('freight', e.target.value)}
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                    {errors.freight && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.freight}</p>
                                        </div>
                                    )}
                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Insurance <span className='text-red-500'>*</span></label>

                                    <input
                                        type='text'
                                        placeholder='Enter Insurance'
                                        ref={insuranceRef}
                                        value={formData.insurance}
                                        onChange={(e) => handleInputChangeForInvoice('insurance', e.target.value)}
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                    {errors.insurance && (
                                        <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                            <InfoCircle size={16} color="#DC2626" />
                                            <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.insurance}</p>
                                        </div>
                                    )}
                                </div>

                            </div>


                            {rows.map((row, index) => (
                                <div key={index} className='grid md:grid-cols-3 sm:grid-cols-2 gap-3 mb-4 flex'>
                                    <div className='mb-2 items-center'>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>
                                            PO Number <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            placeholder='Enter PO Number'
                                            value={row.poNumber}
                                            ref={rowRefs.current[index]?.po}
                                            onChange={(e) => handleInputChange(index, 'poNumber', e.target.value)}
                                            className='w-full px-3 py-3 border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                        />


                                        {errors?.rowErrors?.[index]?.poNumber && (
                                            <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                                <InfoCircle size={16} color="#DC2626" />
                                                <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors?.rowErrors?.[index]?.poNumber}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className='mb-2 items-center'>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>
                                            Date <span className='text-red-500'>*</span>
                                        </label>
                                        <DatePicker
                                            dateFormat="dd/MM/yyyy"
                                            selected={row.date}
                                            onChange={(date) => handleInputChange(index, 'date', date)}
                                            className="w-full"
                                            placeholderText="Select Date"
                                            customInput={<CustomDateInputWrapper inputRef={rowRefs.current[index]?.date} />}
                                            wrapperClassName="w-full"
                                        />

                                        {errors?.rowErrors?.[index]?.date && (
                                            <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                                <InfoCircle size={16} color="#DC2626" />
                                                <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors?.rowErrors?.[index]?.date}</p>
                                            </div>
                                        )}

                                    </div>

                                    <div className='flex gap-4 items-center mt-6'>
                                        {index === rows.length - 1 && (
                                            <button
                                                type="button"
                                                className="w-[52px] px-2 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat text-base font-semibold"
                                                onClick={handleAddRow}
                                            >
                                                +
                                            </button>
                                        )}
                                        {rows.length > 1 && (
                                            <button
                                                type="button"
                                                className="w-[52px] px-2 py-2.5 bg-[#fff] border border-[#EE0F0F] rounded-lg text-white font-Montserrat text-base font-semibold flex items-center justify-center"
                                                onClick={() => handleRemoveRow(index)}
                                            >
                                                <Trash size="16" color="#EE0F0F" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}


                        </div>

                        <div className="flex justify-end gap-3 h-fit items-center mt-4">


                            <button className="w-[167px] px-10 py-2  border border-[#205DA8] rounded-lg text-[#205DA8] font-Montserrat text-base font-semibold" onClick={handleSaveExitForInvoiceDetail} >Save & Exit</button>

                            <button className="w-[167px] px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat text-base font-semibold" onClick={handleNextItemDetail} >Next</button>

                        </div>
                    </>


                }


                {
                    value === 3 &&
                    <>
                        <div className='h-fit overflow-y-auto  lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3 ' >
                            <div
                                className="">
                                <div className='rounded-xl border border-slate-200 max-h-[250px] overflow-y-auto p-0 mt-4 '>

                                    <table className="w-full table-auto border-collapse rounded-xl border-b-0 border-[#E1E8F0]">
                                        <thead className="bg-[#205DA8] sticky top-0 z-10">
                                            <tr>
                                                <th className="px-4 py-2 text-center text-[#fff] text-base font-medium font-Gilroy">Item No.
                                                </th>
                                                <th className="px-4 py-2 text-center text-[#fff] text-sm font-medium font-Gilroy">Description</th>
                                                <th className="px-4 py-2 text-center text-[#fff] text-sm font-medium font-Gilroy">HSN</th>
                                                <th className="px-4 py-2 text-center text-[#fff] text-sm font-medium font-Gilroy">Quantity</th>
                                                <th className="px-4 py-2 text-center text-[#fff] text-sm font-medium font-Gilroy">Per Unit <br /> <span className='text-center text-[#fff] text-xs font-medium font-Gilroy'>Cost in USD</span></th>
                                                <th className="px-4 py-2 text-center text-[#fff] text-sm font-medium font-Gilroy">Total <br /><span className='text-center text-[#fff] text-xs font-medium font-Gilroy'>Cost in USD</span></th>
                                                <th className="px-4 py-2 text-center text-[#fff] text-sm font-medium font-Gilroy">Package No</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {items.map((item, index) => (
                                                <tr key={index} className="border-0">
                                                    <td className="px-2 py-2 text-center">
                                                        <input type="text"
                                                            ref={getInputRef('itemNo', index)}
                                                            value={item.itemNo}
                                                            onChange={(e) => handleItemChange(index, 'itemNo', e.target.value)}
                                                            placeholder="Enter Item No." className="w-full px-3 py-3 border rounded-xl text-sm focus:outline-none" />

                                                        {itemErrors[index]?.itemNo && (
                                                            <div className="text-red-500 text-[12px] mt-1 flex items-center gap-1 font-Gilroy">

                                                                {itemErrors[index].itemNo}
                                                            </div>
                                                        )}


                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                        <input type="text"
                                                            ref={getInputRef('description', index)}
                                                            value={item.description}
                                                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                                            placeholder="Enter Description" className="w-full px-3 py-3 border rounded-xl text-sm focus:outline-none" />

                                                        {itemErrors[index]?.description && (
                                                            <div className="text-red-500 text-[12px] mt-1 flex items-center gap-1 font-Gilroy">
                                                                {itemErrors[index].description}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                        <input type="text"
                                                            value={item.hsn}
                                                            ref={getInputRef('hsn', index)}
                                                            onChange={(e) => handleItemChange(index, 'hsn', e.target.value)}
                                                            placeholder="Enter HSN" className="w-full px-3 py-3 border rounded-xl text-sm focus:outline-none" />
                                                        {itemErrors[index]?.hsn && (
                                                            <div className="text-red-500 text-[12px] mt-1 flex items-center gap-1 font-Gilroy">

                                                                {itemErrors[index].hsn}
                                                            </div>
                                                        )}

                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                        <input type="text"
                                                            value={item.qty}
                                                            ref={getInputRef('qty', index)}
                                                            onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                                                            placeholder="Enter Item QTY" className="w-full px-3 py-3 border rounded-xl text-sm focus:outline-none" />

                                                        {itemErrors[index]?.qty && (
                                                            <div className="text-red-500 text-[12px] mt-1 flex items-center gap-1 font-Gilroy">

                                                                {itemErrors[index].qty}
                                                            </div>
                                                        )}


                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                        <input type="text"
                                                            value={item.unitCost}
                                                            ref={getInputRef('unitCost', index)}
                                                            onChange={(e) => handleItemChange(index, 'unitCost', e.target.value)}
                                                            placeholder="Enter Per Unit" className="w-full px-3 py-3 border rounded-xl text-sm focus:outline-none" />


                                                        {itemErrors[index]?.unitCost && (
                                                            <div className="text-red-500 text-[12px] mt-1 flex items-center gap-1 font-Gilroy">

                                                                {itemErrors[index].unitCost}
                                                            </div>
                                                        )}

                                                    </td>
                                                    <td className="px-2 py-2 text-center">

                                                        <input type="text" value={item.total}
                                                            readOnly placeholder="Total" className={`w-full px-3 py-3 border rounded-xl text-sm focus:outline-none ${itemErrors[index] && Object.keys(itemErrors[index]).length > 0 ? "mb-5" : "mb-0"
                                                                }`} />
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                        <input type="text" value={item.packageNo}
                                                            ref={getInputRef('packageNo', index)}
                                                            onChange={(e) => handleItemChange(index, 'packageNo', e.target.value)}
                                                            placeholder="Enter No" className="w-full px-3 py-3 border rounded-xl text-sm focus:outline-none" />

                                                        {itemErrors[index]?.packageNo && (
                                                            <div className="text-red-500 text-[11px] mt-1 flex items-center gap-1 font-Gilroy">
                                                                {itemErrors[index].packageNo}
                                                            </div>
                                                        )}


                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>

                                </div>
                            </div>


                            <div className='flex justify-end  items-center w-full mt-4'>
                                <input
                                    type='text'
                                    placeholder='Total Value'
                                    value={grandTotal}
                                    readOnly
                                    className=' w-[250px]  px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                />
                            </div>


                            <div className='flex justify-end  items-center w-full mt-4'>
                                <label className='font-Gilroy text-base font-semibold text-[#205DA8] hover:underline cursor-pointer' onClick={handleAddItem}>+ Add Item</label>
                            </div>

                        </div>

                        <div className="flex justify-end gap-3 h-fit items-center mt-2">


                            <button className="w-[167px] px-10 py-2  border border-[#205DA8] rounded-lg text-[#205DA8] font-Montserrat text-base font-semibold" onClick={handleSaveExitForItemDetail} >Save & Exit</button>

                            <button className="w-[167px] px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat text-base font-semibold" onClick={handleNextPackageDetail}>Next</button>

                        </div>
                    </>}


                {
                    value === 4 &&
                    <>
                        <div className='h-fit overflow-y-auto  lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3 ' >






                            <div
                                className="">
                                <div className='rounded-xl border border-slate-200 max-h-[230px] overflow-y-auto p-0 mt-4 '>

                                    <table className="w-full table-auto border-collapse rounded-xl border-b-0 border-[#E1E8F0]">
                                        <thead className="bg-[#F1F4F9] sticky top-0 z-10">
                                            <tr>
                                                <th className="px-4 py-2 text-center text-[#4B4B4B] text-base font-light font-Gilroy">Package Type
                                                </th>
                                                <th className="px-4 py-2 text-center text-[#4B4B4B] text-sm font-light font-Gilroy">Size in CM</th>
                                                <th className="px-4 py-2 text-center text-[#4B4B4B] text-sm font-light font-Gilroy">Empty Weight in Kg</th>
                                                <th className="px-4 py-2 text-center text-[#4B4B4B] text-sm font-light font-Gilroy">Gross Weight in kg</th>
                                                <th className="px-4 py-2 text-center text-[#4B4B4B] text-sm font-light font-Gilroy">Marks  on Package</th>
                                                <th className="px-4 py-2 text-center text-[#4B4B4B] text-sm font-light font-Gilroy">Number of Package</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {items.map((item, index) => (
                                                <tr key={index} className="border-0">
                                                    <td className="px-2 py-2 text-center">
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>

                                </div>
                            </div>


                            <div className='flex justify-end  gap-4 items-center w-full mt-4'>
                                <input
                                    type='text'
                                    placeholder='Grand Total '
                                    className=' w-[200px]  px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                <input
                                    type='text'
                                    placeholder='Net Weight of Goods in Kg'
                                    className=' w-[200px]  px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                <input
                                    type='text'
                                    placeholder='Gross Weight in kg'
                                    className=' w-[200px]  px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                <input
                                    type='text'
                                    placeholder='Total Number of package '
                                    className=' w-[200px]  px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                />
                            </div>


                            <div className='flex justify-end  items-center w-full mt-6'>
                                <label className='font-Gilroy text-base font-semibold text-[#205DA8] hover:underline cursor-pointer' onClick={handleAddProduct}>+ Add product</label>
                            </div>

                        </div>

                        <div className="flex justify-end gap-3 h-fit items-center mt-3">


                            <button className="w-[167px] px-10 py-2  border border-[#205DA8] rounded-lg text-[#205DA8] font-Montserrat text-base font-semibold"  >Save & Exit</button>

                            <button className="w-[167px] px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat text-base font-semibold" >Submit</button>

                        </div>
                    </>}



                {showBox && <AddBox handleClose={handleCloseAddBox} />}

                {showProduct && <InvoiceAddProduct handleClose={handleCloseAddProduct} />}
            </div>





        </div>
    )
}



AddInvoice.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
    placeholder: PropTypes.string,
    inputRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ])
}

export default AddInvoice