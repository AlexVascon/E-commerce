import React from 'react';
import { View } from '../components/View';
import shippingImg from '../assets/shipping_background.jpg';
import { Form, FormGroup, Input } from '../components/Form';
import { Button } from '../components/Button';

export default function Shipping() {
  return (
    <View imageUrl={process.env.PUBLIC_URL + shippingImg}>
      <Form>
        <Input type='text' placeholder='Full name' />
        <Input type='text' placeholder='Phone number' />
        <Input type='email' placeholder='Email' />
        <FormGroup>
          <Input type='text' placeholder='Country' />
          <Input type='text' placeholder='City' />
        </FormGroup>
        <FormGroup>
          <Input type='text' placeholder='Province' />
          <Input type='text' placeholder='Postal code' />
        </FormGroup>
        <Input type='text' placeholder='Street address' />
        <Button light={true} type='submit'>
          SAVE
        </Button>
      </Form>
    </View>
  );
}
