const validate = require("./validation");
const Joi = require("joi");

module.exports = {
  loginSchema: Joi.object().keys({
    email: validate.reqEmail,
    password: validate.reqString,
  }),
  expenseCategorySchema: Joi.object().keys({
    name: validate.reqString,
  }),
  expenseSchema: Joi.object().keys({
    user_id: validate.reqNumber,
    category_id: validate.reqNumber,
    amount: validate.reqNumber,
    date: validate.reqDate,
    description: validate.reqString,
  }),
  expenseFilterSchema: Joi.object().keys({
    user: validate.number,
    category: validate.number,
    fromDate: validate.date,
    toDate: validate.date,
  }),
  userSchema: Joi.object().keys({
    name: validate.reqString,
    email: validate.reqEmail,
  }),
  changeUserStatusSchema: Joi.object().keys({
    status: validate.reqString,
  }),
};
