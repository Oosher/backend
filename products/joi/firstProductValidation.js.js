const Joi = require("joi");




const firstProductValidation =  (image) => {





    const schema = Joi.object({
        imageUrl: Joi.string().ruleset.regex(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/).rule({message: "the url is not valid"}).required(),
        imageAlt:Joi.string().ruleset.min(3).rule({message:"must include an image alt"}).required(),


    })
    return schema.validate(image);

}




module.exports = firstProductValidation;