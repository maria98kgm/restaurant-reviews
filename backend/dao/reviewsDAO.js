import { ObjectId } from "mongodb";

let reviews;

export default class ReviewDAO {
  static async injectDB(conn) {
    if (reviews) return;
    try {
      reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews");
    } catch (err) {
      console.error(`Unable to establish connection in reviewsDAO: ${err}`);
    }
  }

  static async addReview(restaurantId, user, review, date) {
    try {
      const reviewDoc = {
        user_id: user._id,
        name: user.name,
        date: date,
        text: review,
        restaurantId: new ObjectId(restaurantId),
      };

      return await reviews.insertOne(reviewDoc);
    } catch (err) {
      console.error(`Unable to post review: ${err}`);
      return { error: err };
    }
  }

  static async updateReview(reviewId, userId, text, date) {
    try {
      const reviewToUpdate = { user_id: userId, _id: new ObjectId(reviewId) };
      const updateResponse = await reviews.updateOne(reviewToUpdate, {
        $set: { text: text, date: date },
      });

      return updateResponse;
    } catch (err) {
      console.error(`Unable to update review: ${err}`);
      return { error: err };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId,
      });

      return deleteResponse;
    } catch (err) {
      console.error(`Unable to delete review: ${err}`);
      return { error: err };
    }
  }
}
