module.exports = {
  ValidateBody: (schema) => {
    return (req, res, next) => {
      const { error, value } = schema.validate(req.body);

      if (error) {
        // Handle validation error
        return res
          .status(400)
          .json({ success: false, error: error.details[0].message });
      }

      // Set the validated query parameters in the request object
      req.body.data = value;

      // Pass control to the next middleware or route handler
      next();
    };
  },
};
