import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { createProduct } from '../actions/productActions'
import instance from '../service/api'
import { Form, Input, Select, TextArea } from '../components/Form'
import { Button, View, Error, Heading, Message, LoadingSpinner } from '../components/MyLibrary'
import editImg from '../assets/cloudy_mountain_DARK.jpg'

export default function ProductCreate() {
  const dispatch = useDispatch()
  const {createProductSuccess, createProductError, loadingCreateProduct} = useSelector((state) => state.createProduct)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [selection, setSelection] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const handleNameChange = (e) => setName(e.target.value)
  const handlePriceChange = (e) => setPrice(e.target.value)
  const handleQuantityChange = (e) => setQuantity(e.target.value)
  const handleSelectionChange = (e) => setSelection(e.target.value)
  const handleCategoryChange = (e) => setCategory(e.target.value)
  const handleDescriptionChange = (e) => setDescription(e.target.value)

  const handleUploadImageHandler = async (e) => {
    e.preventDefault()
    try {
      const uploadData = new FormData()
      uploadData.append('image', e.target.files[0])
      setIsUploading(true)
      const {data} = await instance.post('/upload/product', uploadData)
      setImageURL(data?.cloud_url)
    } catch(err) {
      console.error(err)
    } finally {
      setIsUploading(false)
    }
  }

  const handleCreateProductSubmit = async (e) => {
    e.preventDefault()
    const product = {name, price, quantity, selection, category, description, imageURL}
    dispatch(createProduct(product))
  }

  return (
    <View imageUrl={editImg}>
     <Heading>Create Product</Heading>
     {loadingCreateProduct && <LoadingSpinner />}
     {createProductSuccess && <Message>Product created!</Message>}
    {createProductError && <Error>{createProductError}</Error>}
      <Form enctype='multipart/form-data' onSubmit={handleCreateProductSubmit}>
        <Input type='text' placeholder='Name' onChange={handleNameChange} />
        <Input type='number' placeholder='Price' onChange={handlePriceChange}/>
        <Input type='number' placeholder='Quantity' onChange={handleQuantityChange} />
        <Select value='' name='selection' onChange={handleSelectionChange}>
          <option >Select gender</option>
          <option value='men'>Men</option>
          <option value='women'>Women</option>
        </Select>
        <Select value='Select category' name='category' onChange={handleCategoryChange}>
          <option value='Select category'>Select category</option>
          <option value='shirt'>Shirt</option>
          <option value='jumper'>Jumper</option>
          <option value='suit'>Suit</option>
          <option value='dress'>Dress</option>
        </Select>
        <TextArea dark rows='4' cols='50' type='text' placeholder='description' onChange={handleDescriptionChange} />
        <Input type='file' onChange={handleUploadImageHandler}  />
        <Button light type='submit'>CREATE</Button>
      </Form>
    </View>
  )
}
