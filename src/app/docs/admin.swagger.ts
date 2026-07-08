/**
 * @openapi
 * tags:
 *   - name: Admin
 *     description: Administrative Management APIs
 */

/**
 * @openapi
 * /admin/users:
 *   get:
 *     summary: Get All Users
 *     description: Retrieve all registered users. Accessible only by ADMIN.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @openapi
 * /admin/users/{id}:
 *   patch:
 *     summary: Update User Status
 *     description: Suspend or activate a user account.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 3d9d3df2-98f6-44bc-a4c7-60d5b4fd99d0
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
 *                 enum:
 *                   - ACTIVE
 *                   - SUSPENDED
 *                 example: ACTIVE
 *     responses:
 *       200:
 *         description: User status updated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */

/**
 * @openapi
 * /admin/gear:
 *   get:
 *     summary: Get All Gear Listings
 *     description: Retrieve all gear listings in the system.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Gear listings retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @openapi
 * /admin/rentals:
 *   get:
 *     summary: Get All Rental Orders
 *     description: Retrieve all rental orders in the system.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rental orders retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

export {};