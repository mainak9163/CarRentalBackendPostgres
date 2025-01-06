import { Request, Response } from 'express';
import prisma from '../models/prisma';

export const bookCar = async (req: Request, res: Response) => {
  try {
    const { registrationNumber, email, duration, finalPrice } = req.body;

    const car = await prisma.car.findUnique({
      where: { registrationNumber },
    });
    if (!car || car.booked) {
      return res.status(400).json({ error: 'Car not available' });
    }

    const customer = await prisma.customer.findUnique({
      where: { email },
    });
    if (!customer) {
      return res.status(400).json({ error: 'Customer not found' });
    }

    const booking = await prisma.booking.create({
      data: {
        carId: car.id,
        customerId: customer.id,
        duration,
        finalPrice,
      },
    });

    await prisma.car.update({
      where: { id: car.id },
      data: { booked: true },
    });

    res.status(201).json(booking);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};
