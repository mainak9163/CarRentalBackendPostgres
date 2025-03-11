import express from 'express';
import carRoutes from '../routes/carRoutes';
import customerRoutes from '../routes/customerRoutes';
import bookingRoutes from './routes/bookingRoutes';

const app = express();
app.use(express.json());

app.use('/api/cars', carRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/booking', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
