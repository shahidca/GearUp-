/**
 * @openapi
 * tags:
 *   - name: Reviews
 *     description: Customer Review APIs
 */

/**
 * @openapi
 * /reviews:
 *   post:
 *     summary: Create a Review
 *     description: Customer can submit a review only after successfully returning a rented gear.
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gearItemId
 *               - rating
 *             properties:
 *               gearItemId:
 *                 type: string
 *                 description: Gear Item ID
 *                 example: 2a8a82d2-d8f2-44d5-a80c-77d6dce1d8ef
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Excellent gear quality and smooth rental experience.
 *     responses:
 *       201:
 *         description: Review submitted successfully
 *       400:
 *         description: Validation failed or review already exists
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Customer is not eligible to review this gear
 *       404:
 *         description: Gear item not found
 */

export {};