import React from 'react'
import { View, Section, SubTitle, Row, RowText } from '../components/MyLibrary'

export default function OrderDetails() {
  return (
    <View>
      <Section>
      <SubTitle>
      Order Summary
      </SubTitle>
      <Row>
        <RowText>Items</RowText>
        <RowText>$300</RowText>
      </Row>
      <Row>
      <RowText>Shipping</RowText>
        <RowText>$30</RowText>
      </Row>
      </Section>
      <Section>
      <SubTitle>
      Shipping
      </SubTitle>
        <Row>
          <RowText>Name</RowText>
          <RowText>John Doe</RowText>
        </Row>
        <Row>
          <RowText>Email</RowText>
          <RowText>JohnDoe@gmail.com</RowText>
        </Row>
        <Row>
          <RowText>Address</RowText>
          <RowText>Bulgersteyn 7157 3011AB Rotterdam</RowText>
        </Row>
        <SubTitle>
          Items
        </SubTitle>
        
      </Section>
    </View>
  )
}
