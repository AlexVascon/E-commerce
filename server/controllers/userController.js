
export const register = async (req,res,next) => {
  try {
    const {username, email, password, confirmPassword} = req.body
    if(password !== confirmPassword) return res.status(400).send({message: 'passwords dont match.'})
    const user = await new User({
      username: username,
      email: email,
      password: password
    })
    await user.save()
    res.status(200).send(user)
  } catch (err) {
    next(err)
  }
}