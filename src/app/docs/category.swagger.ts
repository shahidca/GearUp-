/**
 * @openapi
 * tags:
 *   - name: Categories
 *     description: Category Management APIs
 */

/**
 * @openapi
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Only ADMIN can create a category.
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Camping
 *               description:
 *                 type: string
 *                 example: Camping equipment and accessories.
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

export {};