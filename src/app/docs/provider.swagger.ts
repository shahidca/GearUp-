/**
 * @openapi
 * tags:
 *   - name: Provider
 *     description: Provider Rental Management APIs
 */

/**
 * @openapi
 * /provider/orders:
 *   get:
 *     summary: Get Provider Rental Orders
 *     description: Returns all rental orders for the authenticated provider.
 *     tags:
 *       - Provider
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Provider orders retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @openapi
 * /provider/orders/{id}:
 *   patch:
 *     summary: Update Rental Order Status
 *     description: Provider can update the status of a rental order (e.g. CONFIRMED, PICKED_UP, RETURNED).
 *     tags:
 *       - Provider
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: d4c9a8b4-1d7b-48a8-a4bc-7c2f1e4d91ab
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: New rental order status.
 *                 enum:
 *                   - CONFIRMED
 *                   - PICKED_UP
 *                   - RETURNED
 *                 example: CONFIRMED
 *     responses:
 *       200:
 *         description: Rental order status updated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Rental order not found
 */

export {};