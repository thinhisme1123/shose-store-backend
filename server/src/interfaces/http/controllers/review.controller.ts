// interfaces/controllers/review.controller.ts

import { CreateReview } from "../../../application/use-cases/review/create-review"
import { FindByProductReview } from "../../../application/use-cases/review/find-product-id"
import { ReviewRepository } from "../../../infrastructure/repositories/review.repository"

const repo = new ReviewRepository()
const createReview  = new CreateReview(repo)
const findByIdReview  = new FindByProductReview(repo)


export async function createReviewController(req, res) {
  try {
    const review = await createReview.execute({
        productId: req.body.productId,
        userId: req.user.id,
        userName: req.user.fullName,
        rating: req.body.rating,
        title: req.body.title,
        content: req.body.content,
        images: req.body.images,
    })

    res.status(201).json(review)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export async function fingByProductIdReviewController(req, res) {
  const productId = req.params.id

  try {
    const review = await findByIdReview.execute(productId)

    res.status(201).json({reviews: review})
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
