const Joi = require("joi");




const productImageValidation =  (image) => {





    const schema = Joi.object({
        imageUrl: Joi.string().ruleset.regex(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/).rule({message: "the url is not valid"}).allow(""),
        imageAlt:Joi.string().ruleset.min(3).rule({message:"must include an image alt"}).allow(""),


    })
    return schema.validate(image);

}




module.exports = productImageValidation;