import React, {useState, useEffect} from 'react'
import instance from '../service/api'
import {useDispatch, useSelector} from 'react-redux'
import { useParams} from 'react-router-dom'
import { updateProduct, fetchProductInformation } from '../actions/productActions'
import { Form, Input, Select, TextArea } from '../components/Form'
import { Button, Heading, SubTitle, View } from '../components/MyLibrary'
import createImg from '../assets/cloudy_mountain_DARK.jpg'

export default function ProductUpdate() {
  const {productId} = useParams()
  const dispatch = useDispatch()
  const {foundProductInformation} = useSelector((state) => state.fetchProductInformation)
  useEffect(() => {
    dispatch(fetchProductInformation(productId))
  }, [dispatch, productId])

  const [name, setName] = useState(foundProductInformation?.title)
  const [price, setPrice] = useState(foundProductInformation?.price)
  const [quantity, setQuantity] = useState(foundProductInformation?.quantity)
  const [selection, setSelection] = useState(foundProductInformation?.selection)
  const [category, setCategory] = useState(foundProductInformation?.category)
  const [description, setDescription] = useState(foundProductInformation?.description)
  const [imageURL, setImageURL] = useState(foundProductInformation?.image)
  const [isUploading, setIsUploading] = useState(false)

  const handleNameChange = (e) => setName(e.target.value)
  const handlePriceChange = (e) => setPrice(e.target.value)
  const handleQuantityChange = (e) => setQuantity(e.target.value)
  const handleSelectionChange = (e) => setSelection(e.target.value)
  const handleCategoryChange = (e) => setCategory(e.target.value)
  const handleDescriptionChange = (e) => setDescription(e.target.value)

  useEffect(() => {
    if(foundProductInformation) {
      setName(foundProductInformation.title)
      setPrice(foundProductInformation.price)
      setQuantity(foundProductInformation.quantity)
      setSelection(foundProductInformation.selection)
      setCategory(foundProductInformation.category)
      setDescription(foundProductInformation.description)
      setImageURL(foundProductInformation.image)
    }
  }, [foundProductInformation])

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
    dispatch(updateProduct(product))
  }

  return (
    <View imageUrl={createImg}>
       <Heading>Update Product</Heading>
     {foundProductInformation && <Form enctype='multipart/form-data' onSubmit={handleCreateProductSubmit}>
        <Input type='text' value={name} onChange={handleNameChange} />
        <Input type='number' value={price} onChange={handlePriceChange}/>
        <Input type='number' value={quantity} onChange={handleQuantityChange} />
        <Select value={selection} onChange={handleSelectionChange}>
          <option >Select gender</option>
          <option value='men'>Men</option>
          <option value='women'>Women</option>
        </Select>
        <Select value={category} name='category' onChange={handleCategoryChange}>
          <option value='Select category'>Select category</option>
          <option value='shirt'>Shirt</option>
          <option value='jumper'>Jumper</option>
          <option value='suit'>Suit</option>
          <option value='dress'>Dress</option>
        </Select>
        <TextArea dark rows='4' cols='50' type='text' value={description} onChange={handleDescriptionChange} />
        <Input type='file' onChange={handleUploadImageHandler} />
        <Button light type='submit'>UPDATE</Button>
      </Form>
     }
    </View>
  )
}
