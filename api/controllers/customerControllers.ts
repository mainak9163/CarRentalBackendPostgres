import { Request, Response } from 'express';
import prisma from '../models/prisma';
const bcrypt = require('bcrypt');

export const addCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const customer = await prisma.customer.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(201).json(customer);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export const verifyCustomer = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const customer = await prisma.customer.findUnique({ where: { email } });
      if (customer) {
        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (isPasswordValid) {
          res.status(200).json(customer);
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  };

export const getAllCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany();
    res.status(200).json(customers);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};
