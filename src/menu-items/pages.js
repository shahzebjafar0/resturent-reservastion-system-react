// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //
const user_id = 1;
const pages = {
    id: 'authentication',
    // title: 'Reservation Information',
    type: 'group',
    children: [
        {
            id: 'myReservation',
            title: 'My Reservation ',
            type: 'item',
            url: `/reservation/${user_id}`,
            icon: icons.ProfileOutlined
            // target: true
        },
        {
            id: 'allReservation',
            title: 'All Reservations ',
            type: 'item',
            url: '/reservations',
            icon: icons.ProfileOutlined
            // target: true
        }
    ]
};

export default pages;
