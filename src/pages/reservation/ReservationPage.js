import MainCard from 'components/MainCard';
import PatronOrderTable from 'pages/dashboard/OrdersTable';

// ==============================|| SAMPLE PAGE ||============================== //

const Reservation = () => (
    <MainCard title="My Reservations">
        <PatronOrderTable />
    </MainCard>
);

export default Reservation;
