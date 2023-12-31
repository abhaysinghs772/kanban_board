import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Usermodel } from '../models';

import { createUserBody } from '../interfaces/user/createUser.body';
import dotenv from 'dotenv';
dotenv.config();

export async function signUp(req: Request, res: Response) {
  try {
    const incomingBody: createUserBody = req.body;

    // check whether user already exist in db or not if not then save it in Db
    const userExist = await Usermodel.findOne({
      email: incomingBody.email,
      phone_number: incomingBody.phone_number,
    });

    if (userExist) {
      // throw error
      return res.status(400).json({ error: 'user already exist !' });
    }

    const hashedPassword = await bcrypt.hash(incomingBody.password, 10);
    incomingBody.password = hashedPassword;
    await Usermodel.create({ ...incomingBody });

    return res.status(201).json({ message: 'user signed up successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server error' });
  }
}

export async function logIn(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await Usermodel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // console.log(Object.keys(user)); // for debugging purpose
    let hasshedpassword = user._doc.password

    const isMatch = await bcrypt.compare(password, hasshedpassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // sign token
    const token = await jwt.sign(
      { user: JSON.stringify(user) },
      'some-secret-encrypeted',
      {
        expiresIn: '4h',
      },
    );

    res.status(200).json({ message: 'successfully logged in', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Logout can be done at frontend's end by simply deleting the auth_token
