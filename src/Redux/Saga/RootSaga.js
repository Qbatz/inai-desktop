import {all} from 'redux-saga/effects';
import VendorSaga from './VendorSaga';
import CustomerSaga from './CustomerSaga';
import SettingsSaga from './SettingsSaga';
import UserSaga from './UserSaga';
import ProductSaga from './ProductSaga'
import InvoiceSaga from './InvoiceSaga';

function* RootSaga() {
    
yield all([

    VendorSaga(),
    CustomerSaga(),
    SettingsSaga(),
    UserSaga(),
    ProductSaga(),
    InvoiceSaga(),
])
}
export default RootSaga;