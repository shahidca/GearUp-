/**
 * @openapi
 * tags:
 *   - name: Rentals
 *     description: Rental Order Management APIs
 */

/**
 * @openapi
 * /rentals:
 *   post:
 *     summary: Create Rental Order
 *     description: Customer creates a new rental order.
 *     tags:
 *       - Rentals
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Rental created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /rentals/my-rentals:
 *   get:
 *     summary: Get My Rentals
 *     description: Returns all rental orders of the authenticated customer.
 *     tags:
 *       - Rentals
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rental list retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /rentals/{rentalId}:
 *   get:
 *     summary: Get Rental Details
 *     description: Returns details of a specific rental order.
 *     tags:
 *       - Rentals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rentalId
 *         required: true
 *         schema:
 *           type: string
 *         example: 6f2b67dd-f6f5-4d58-a66b-5bfe9b3d3c8a
 *     responses:
 *       200:
 *         description: Rental retrieved successfully
 *       404:
 *         description: Rental not found
 */

/**
 * @openapi
 * /rentals/{rentalId}/confirm:
 *   patch:
 *     summary: Confirm Rental
 *     description: Provider confirms a rental request.
 *     tags:
 *       - Rentals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rentalId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rental confirmed successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Rental not found
 */

/**
 * @openapi
 * /rentals/{rentalId}/cancel:
 *   patch:
 *     summary: Cancel Rental
 *     description: Customer cancels a rental order.
 *     tags:
 *       - Rentals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rentalId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rental cancelled successfully
 *       400:
 *         description: Rental cannot be cancelled
 *       404:
 *         description: Rental not found
 */

/**
 * @openapi
 * /rentals/{rentalId}/pickup:
 *   patch:
 *     summary: Pickup Rental
 *     description: Provider marks the rental as picked up.
 *     tags:
 *       - Rentals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rentalId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rental picked up successfully
 *       404:
 *         description: Rental not found
 */

/**
 * @openapi
 * /rentals/{rentalId}/return:
 *   patch:
 *     summary: Return Rental
 *     description: Provider marks the rental as returned.
 *     tags:
 *       - Rentals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rentalId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rental returned successfully
 *       404:
 *         description: Rental not found
 */

export {};