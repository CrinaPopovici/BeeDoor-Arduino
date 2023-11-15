import { UserActivityLevel, UserGoal, UserSex } from '../types';
import { Routes } from '../navigation/screens/routes';

export type RouteParams = {
    [Routes.Welcome]: undefined;
    [Routes.Login]: undefined;
    [Routes.SignUp]: undefined;
    [Routes.UserInfo]: {
        name: string;
    };
    [Routes.UserActivityLevel]: {
        name: string;
        sex: UserSex;
        height: number;
        age: number;
        weight: number;
    };
    [Routes.UserGoal]: {
        name: string;
        sex: UserSex;
        height: number;
        age: number;
        weight: number;
        activity: UserActivityLevel;
    };
    [Routes.SignUpCongrats]: {
        name: string;
        sex: UserSex;
        height: number;
        age: number;
        weight: number;
        activity: UserActivityLevel;
        goal: UserGoal;
    };
    [Routes.Home]: undefined;
    [Routes.AddFood]: undefined;
    [Routes.AddFoodBarcode]: undefined;
};