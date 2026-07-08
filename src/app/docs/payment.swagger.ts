/**
 * @openapi
 * tags:
 *   - name: Payments
 *     description: Stripe Payment Management APIs
 */

/**
 * @openapi
 * /payments/create:
 *   post:
 *     summary: Create Stripe Payment Intent
 *     description: Create a Stripe payment intent for a rental order.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rentalOrderId
 *             properties:
 *               rentalOrderId:
 *                 type: string
 *                 example: 2e6dbdc4-09f8-4fc6-8fdb-1ebdb8b3d715
 *     responses:
 *       200:
 *         description: Payment Intent created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Rental order not found
 */

/**
 * @openapi
 * /payments/confirm:
 *   post:
 *     summary: Confirm Stripe Payment
 *     description: Confirm a successful Stripe payment and update payment status.
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentIntentId
 *             properties:
 *               paymentIntentId:
 *                 type: string
 *                 example: pi_3Rqxxxxxxxxxxxxxxxxxxxx
 *     responses:
 *       200:
 *         description: Payment confirmed successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Payment not found
 */

/**
 * @openapi
 * /payments:
 *   get:
 *     summary: Get My Payment History
 *     description: Returns all payments of the authenticated customer.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment history retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /payments/{id}:
 *   get:
 *     summary: Get Payment Details
 *     description: Returns details of a specific payment.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 1c74d734-3ef7-47e2-92b8-4f6aaf86c2b2
 *     responses:
 *       200:
 *         description: Payment details retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment not found
 */

export {};