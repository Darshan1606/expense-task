const Joi = require("joi");

module.exports = {
  string: Joi.string().min(0),
  reqString: Joi.string().required(),
  reqEmail: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  number: Joi.number(),
  reqNumber: Joi.number().required(),
  array: Joi.array(),
  reqArray: Joi.array().required(),
  arrayObj: Joi.array().items(Joi.object().keys()),
  reqArrayObj: Joi.array().items(Joi.object().keys()).required(),
  boolean: Joi.boolean(),
  reqBoolean: Joi.boolean().required(),
  date: Joi.date(),
  reqDate: Joi.date().required(),
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  object: Joi.object().required(),
};
