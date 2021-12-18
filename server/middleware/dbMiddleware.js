const errorLogger = (error, fields, path) => {
  console.error("\x1b[31m", "message: ", error)
  console.error("\x1b[31m", "fields: ", fields)
  console.error("\x1b[31m", "Path: ", path)
}

const handleDuplicateKeyError = (err, res, req) => {
  const field = Object.keys(err.keyValue)
  const code = 409
  const error = `An account with that ${field} already exists.`
  errorLogger(error, field, req.path)
  res.status(code).send({ messages: error, fields: field })
};

const handleSchemaValidationError = (err, res, req) => {
  const errors = Object.values(err.errors).map((el) => el.message)
  const fields = Object.values(err.errors).map((el) => el.path)
  const code = 400

  if (errors.length > 1) {
    const formattedErrors = errors.join("")
    errorLogger(formattedErrors, fields, req.path)
    return res.status(code).send({ messages: formattedErrors, fields: fields })
  }
  errorLogger(errors, fields, req.path)
  res.status(code).send({ messages: errors, fields: fields })
}

export default (err, req, res, next) => {
  try {
    if (err.name === "DocumentNotFoundError")
      return res.status(404).send({ message: "user not found" })
    if (err.name === "ValidationError")
      return (err = handleSchemaValidationError(err, res, req))
    if (err.code && err.code == 11000)
      return (err = handleDuplicateKeyError(err, res, req))
  } catch (err) {
    console.error(err);
    res.status(500).send("An unknown error occurred.")
  }
}