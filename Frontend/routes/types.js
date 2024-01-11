import {Routes} from '../navigation/screens/routes';

export type RouteParams = {
    [Routes.Welcome]: undefined;
    [Routes.Login]: undefined;
    [Routes.SignUp]: undefined;
    [Routes.UserInfo]: {
        name: string;
    };
};