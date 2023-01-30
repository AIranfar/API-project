const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

// Delete Review Image --DONE

router.delete('/:imageId', requireAuth, async (req, res) => {
    const deletedImage = await ReviewImage.findByPk(req.params.imageId,{
        include: {
            model: Review
        }
    });

    if (!deletedImage) {
        return res.status(404).json({
            "message": "Review Image couldn't be found",
            "statusCode": res.statusCode
        })
    }

    if (req.user.id !== deletedImage.Review.userId){
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }

    await deletedImage.destroy();
    return res.json({
        "message": "Successfully deleted",
        "statusCode": res.statusCode
    })
})


module.exports = router;
