import store from '@/store';
import {
  setAllCityList,
} from '@/store/global/actionCreater';
import {
  getAllCityList,
} from '@/api/commonApi';
import { ISelectOption } from '@/interface';

const { dispatch } = store;

// 所有城市列表
export const dispatchCityList = async () => {
  try {
    const res: any = await getAllCityList();
    const options: ISelectOption[] = (res || []).map(
      (item: any) => ({ label: item.name, value: item.id }),
    );
    dispatch(setAllCityList(options));
  } catch (err) {
    console.log(err);
  }
};
